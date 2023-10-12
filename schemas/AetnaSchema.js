var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts');
var xlsx = require('xlsx');
var db = mongoose.connection;
var Schema = mongoose.Schema;

var plan_schema = new Schema(
    {
        plan_name: { type: [String], index: true }
    },{ autoIndex: false });

var check_plan_schema = new Schema(
    {
        company: String,
        plan_name: String,
        Network : String
    });

var schema = new Schema({
    User: String,
    Path: String,
    Plan: String,
    key_field: String,
    Network: String,
    /* PCP_Referrals_required:
     {
     In_network: String,
     Out_of_network: String
     },*/
    Member_Benefits:
    {

        Calendar_year_plan_deductible:
        {
            In_network:
            {
                Member: String,
                Family: String
            },
            Out_of_network:
            {
                Member: String,
                Family: String
            }
        },
        Out_of_pocket_limit:
        {
            In_network:
            {
                Member: String,
                Family: String
            },
            Out_of_network:
            {
                Member: String,
                Family: String
            }
        },
        /* Deductible_ansd_out_of_pocket_limit_accumulation:
         {
         In_network: String,
         Out_of_network: String
         },
         Not_included_in_out_of_pocket_limit:
         {
         In_network: String,
         Out_of_network: String
         },*/
        Primary_care_physician_office_visit:
        {
            In_network: String,
            Out_of_network: String
        },
        Specialist_office_visit:
        {
            In_network: String,
            Out_of_network: String
        },
        /* Preventive_care_Screenings_Immunizations:
         {
         In_network: String,
         Out_of_network: String
         },
         Imaging:
         {
         In_network: String,
         Out_of_network: String
         },
         Pharmacy_plan_type:
         {
         In_network: String,
         Out_of_network: String
         },
         Prescription_drug_deductible:
         {
         In_network: String,
         Out_of_network: String
         },
         Outpatient_surgery_OP_hospital_department:
         {
         In_network: String],
         Out_of_network: String
         },
         Outpatient_surgery_freestanding_facility:
         {
         In_network: String,
         Out_of_network: String
         },
         Inpatient_hospital_facility:
         {
         In_network: String,
         Out_of_network: String
         },
         Rehabilitation_services:
         {
         In_network: String,
         Out_of_network: String
         },
         Emergency_room:
         {
         In_network: String,
         Out_of_network: String
         },
         Emergency_medical_transport:
         {
         In_network: String,
         Out_of_network: String
         },*/
        Urgent_care:
        {
            In_network: String,
            Out_of_network: String
        },
        /* Walk_in_clinics:
         {
         In_network: String,
         Out_of_network: String
         },
         Chiropractic:
         {
         In_network: String,
         Out_of_network: String
         },
         Adult_routine_vision:
         {
         In_network: String,
         Out_of_network: String
         },
         Diagnostic_testing:
         {
         Lab:
         {
         In_network: String,
         Out_of_network: String   
         },
         X_ray:
         {
         In_network: String,
         Out_of_network: String    
         }
         },*/
        Prescription_drugs:
        {
            Tier_1_preferred_generic:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_2_preferred_brand:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_3_nonpreferred_generic_and_brand:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_4_Aetna_Specialty_CareRx:
            {
                In_network: String,
                Out_of_network: String
            }
        }
    }

});

var SchemaNormal = new Schema({
    User: String,
    Network  : String,
    PlanName : String,
    PlanType : String,
    EffectiveDate: String,
    MetalTier: String,
    FilePath : String,
    Deductible:
    {
        InNetwork:
        {
            Member: String,
            Family: String
        },
        OutOfNetwork:
        {
            Member: String,
            Family: String
        }
    },
    OOPLimit:
    {
        InNetwork:
        {
            Member: String,
            Family: String
        },
        OutOfNetwork:
        {
            Member: String,
            Family: String
        }
    },
    PCPVisit:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    SpecialistVisit:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxTier1:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxTier2:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxTier3:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxTier4:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    UrgentCare:
    {
        InNetwork: String,
        OutOfNetwork: String
    }
});

exports.CheckAetnaPlanList = function (collection_name, res)
{
    var ConnectString = help_scripts.ConnectStr();
    var res_str;
    var i, j;
    var Aetna = mongoose.model(collection_name, SchemaNormal);
    var Plan_list = mongoose.model('Plan', check_plan_schema);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    Plan_list.find({ company : "Aetna" }, function (err, plans)
    {
        if (err) return console.error(err);
        Aetna.find({}, function (err, docs)
        {
            if (err) return console.error(err);
            res_str = '<!DOCTYPE html><html lang="en"><head><meta charset="utf-8" /><title></title></head><body><form method="POST" action=""><table border="0" cellspacing="0" cellpadding="0" width="100%"><caption style="font-weight:bold; font-size: 2em">Carrier name: Aetna</caption>';
            res_str = res_str + '<caption style="font-weight:bold">The list of not found plans</caption>';

            var j = 0;
            var k, i;
            while (j < plans.length)
            {
                k = 0;
                i = 0;
                while (k < docs.length)
                {
                    if (plans[j].plan_name.trim() == docs[k].PlanName.trim())
                    {
                        i = 1;
                        break;
                    }
                    k++;
                };
                if (i == 0)
                    res_str = res_str + '<caption style="font-weight:bold">' + plans[j].plan_name + '</caption>';
                j++;

            };
            res_str = res_str + '</table></form></body></html>';
            res.send(res_str);
        });
    })
};

exports.NewAetnaPage = function (Path, User, res)
{
    var ConnectString = help_scripts.ConnectStr();
    plan_schema.index({ plan_name: 1});
    var Aetna_Plan = mongoose.model('aetna_plan', plan_schema);
    var str;
    var i, j;
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };

    Aetna_Plan.distinct('plan_name', function (err, docs)
    {
        if (err) return console.error(err);
        str = fs.readFileSync('./inputpages/Aetna1.html', "utf-8");
        for (i = 0; i < docs.length; i++)
        {
            str = str + '<option value="' + docs[i] + '">' + docs[i] + '</option>'
        }
        str = str + '</select></caption>';
        str = str + '<caption style="font-weight:bold">Network:<input autocomplete="off" name="Network" style="font-weight:bold" size=30 autofocus><Br>';
        str = str + '</caption><caption style="font-weight:bold">' + 'Path: <a href="' + Path + '" target="_blank">' + Path + '</a><input type="hidden" id="User" name="User" value="' + User + '"><input type="hidden" id="Path" name="Path" value="' + Path + '">' + fs.readFileSync('./inputpages/BlueShield2.html', "utf-8");
        res.send(str);
        mongoose.disconnect();
    });
};

exports.CopyCheckAetna = function (array, collection_name)
{
    var ConnectString = help_scripts.ConnectStr();
    var i, j;
    var Aetna_source = mongoose.model('Aetna', schema);
    var Aetna_copy = mongoose.model(collection_name, SchemaNormal);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    for (i = 0; i < array.length; i++)
    {
        Aetna_source.find({ key_field: array[i] }, function (err, doc)
        {
            if (err) return console.error(err);
            var check_array = [];
            var data_array = [];
            var NewAetna = [];
            var plan_name_array = [];
            var netvotrk_name_array = [];
            var network_count;
            var network_help;
            var m;
            var j;
            var CurPlanType;
            var paln_str = doc[0].key_field.substring(doc[0].key_field.indexOf('|') + 1);
            var path_str = doc[0].key_field.substring(0, doc[0].key_field.indexOf('|'));
            if (paln_str.indexOf('HMO') >= 0) CurPlanType = 'HMO';
            else CurPlanType = 'PPO';
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Network;
            data_array[0] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Calendar_year_plan_deductible.In_network.Member;
            data_array[1] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Calendar_year_plan_deductible.In_network.Family;
            data_array[2] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Member;
            data_array[3] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Family;
            data_array[4] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Out_of_pocket_limit.In_network.Member;
            data_array[5] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Out_of_pocket_limit.In_network.Family;
            data_array[6] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Out_of_pocket_limit.Out_of_network.Member;
            data_array[7] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Out_of_pocket_limit.Out_of_network.Family;
            data_array[8] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Primary_care_physician_office_visit.In_network;
            data_array[9] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Primary_care_physician_office_visit.Out_of_network;
            data_array[10] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Specialist_office_visit.In_network;
            data_array[11] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Specialist_office_visit.Out_of_network;
            data_array[12] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Urgent_care.In_network;
            data_array[13] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Urgent_care.Out_of_network;
            data_array[14] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.In_network;
            data_array[15] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.Out_of_network;
            data_array[16] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.In_network;
            data_array[17] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.Out_of_network;
            data_array[18] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.In_network;
            data_array[19] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.Out_of_network;
            data_array[20] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.In_network;
            data_array[21] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.Out_of_network;
            data_array[22] = help_scripts.GetCorrField(check_array);
            var digits_str = help_scripts.GetDigitsLine(paln_str);
            if (data_array[0].indexOf(',') >= 0)
            {
                network_count = 0;
                while (data_array[0].indexOf(',') >= 0)
                {
                    netvotrk_name_array[network_count] = data_array[0].substring(0, data_array[0].indexOf(','));
                    netvotrk_name_array[network_count] = netvotrk_name_array[network_count].trim();
                    network_count++;
                    data_array[0] = data_array[0].substring(data_array[0].indexOf(',') + 1);
                };
                netvotrk_name_array[network_count] = data_array[0].trim();
                for (j = 0; j <= network_count; j++)
                {
                    plan_name_array[j] = paln_str.substring(0, paln_str.indexOf(' '));
                    network_help = netvotrk_name_array[j];
                    network_help = network_help.replace('Managed Choice POS (Open Access)', 'MC');
                    network_help = network_help.replace('Aetna Value Network HMO', 'AVN HMO');
                    network_help = network_help.replace('Coinsurance Plan', '');
                    network_help = network_help.replace('Copay Plan', '');
                    network_help = network_help.replace('Plan', '');
                    plan_name_array[j] = plan_name_array[j] + ' ' + network_help.trim();
                    if (paln_str.indexOf(' HSA ') > 0)
                        plan_name_array[j] = plan_name_array[j] + ' HSA';
                    if (paln_str.indexOf(' HDHP ') > 0)
                        plan_name_array[j] = plan_name_array[j] + ' HDHP';
                    if (digits_str != '')
                        plan_name_array[j] = plan_name_array[j] + ' ' + digits_str;
                    if (paln_str.indexOf(' Coinsurance Plan') > 0)
                        plan_name_array[j] = plan_name_array[j] + ' Coinsurance Plan';
                    else if (paln_str.indexOf(' Copay Plan') > 0)
                        plan_name_array[j] = plan_name_array[j] + ' Copay Plan';
                    else if (paln_str.indexOf(' Plan') > 0)
                        plan_name_array[j] = plan_name_array[j] + ' Plan';

                };


            }
            else
            {
                plan_name_array[0] = paln_str;
                netvotrk_name_array[0] = data_array[0];
                netvotrk_name_array[0] = netvotrk_name_array[0].trim();
                network_count = 0;
            };
            for (j = 0; j <= network_count; j++)
            {

                NewAetna[j] = new Aetna_copy({
                    Network: netvotrk_name_array[j],
                    PlanName: plan_name_array[j],
                    FilePath: path_str,
                    PlanType: CurPlanType,

                    Deductible:
                    {
                        InNetwork:
                        {
                            Member: data_array[1],
                            Family: data_array[2]
                        },
                        OutOfNetwork:
                        {
                            Member: data_array[3],
                            Family: data_array[4]
                        }
                    },
                    OOPLimit:
                    {
                        InNetwork:
                        {
                            Member: data_array[5],
                            Family: data_array[6]
                        },
                        OutOfNetwork:
                        {
                            Member: data_array[7],
                            Family: data_array[8]
                        }
                    },
                    PCPVisit:
                    {
                        InNetwork: data_array[9],
                        OutOfNetwork: data_array[10]
                    },
                    SpecialistVisit:
                    {
                        InNetwork: data_array[11],
                        OutOfNetwork: data_array[12]
                    },
                    UrgentCare:
                    {
                        InNetwork: data_array[13],
                        OutOfNetwork: data_array[14]
                    },

                    RxTier1:
                    {
                        InNetwork: data_array[15],
                        OutOfNetwork: data_array[16]
                    },
                    RxTier2:
                    {
                        InNetwork: data_array[17],
                        OutOfNetwork: data_array[18]
                    },
                    RxTier3:
                    {
                        InNetwork: data_array[19],
                        OutOfNetwork: data_array[20]
                    },
                    RxTier4:
                    {
                        InNetwork: data_array[21],
                        OutOfNetwork: data_array[22]
                    }


                });
                try
                {
                    NewAetna[j].save(function (err, thor)
                    {
                        if (err) return console.error(err);

                    });
                } catch (err)
                {
                    mongoose.disconnect();
                    return (err);
                };
            };
        });

    };
    return ('Copying of "Aetna" in a collection "' + collection_name + '" took place successfully');
}

exports.SetCheckAetna = function (res)
{
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var paths = [];
    var result_str = '';
    var FindAetna = mongoose.model('Aetna', schema);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    db.on("error", console.error.bind(console, "connection error:"));
    try
    {
        FindAetna.distinct('key_field', {}, function (err, paths)
        {
            if (err) return console.error(err);
            FindAetna.find({}, function (err, docs)
            {
                if (err) return console.error(err);
                var i, m;
                var j = 0;
                var k;
                var count_result = [];
                var cur_docs = [];
                var check_array = []
                while (j < paths.length)
                {
                    count_result[j] = 0
                    CurPlanType = '';
                    k = 0;
                    i = 0;
                    cur_docs.length = 0;
                    while (k < docs.length)
                    {
                        if (paths[j] == docs[k].key_field)
                        {
                            cur_docs[i] = docs[k];
                            i++;
                        };
                        k++;
                    }
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Calendar_year_plan_deductible.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Calendar_year_plan_deductible.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Out_of_pocket_limit.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Out_of_pocket_limit.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Out_of_pocket_limit.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Out_of_pocket_limit.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Primary_care_physician_office_visit.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Primary_care_physician_office_visit.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Specialist_office_visit.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Specialist_office_visit.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Urgent_care.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Urgent_care.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    result_str = result_str + '<tr><td>' + paths[j].substring(0, paths[j].indexOf('|')) + '</td><td name=>' + paths[j].substring(paths[j].indexOf('|') + 1) + '</td><td>' + count_result[j] + '</td><td>';
                    if (count_result[j] == 0)
                        result_str = result_str + '<input type="checkbox" name="check_result' + j.toString() + '"></td></tr>';
                    else
                        result_str = result_str + '<input type="hidden" name="check_result' + j.toString() + '"></td></tr>';
                    result_str = result_str + '<input type="hidden" id="paths_result' + j.toString() + '" name="paths_result' + j.toString() + '" value="' + paths[j] + '">';
                    j++;
                }
                result_str = result_str + '<input type="hidden" id="count_str" name="count_str" value="' + j.toString() + '">';
                str = fs.readFileSync('./inputpages/Aetna_result.html', "utf-8") + result_str;
                mongoose.disconnect();
                res.send(str);
            });

        });
    } catch (err)
    {
        mongoose.disconnect();
        return (err);
    };

}

exports.SetAetnaNormal = function ()
{
    var AetnaCount = 0;
    var NewAetnaNormal;
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var FindAetna = mongoose.model('Aetna', schema);
    var AetnaNormal = mongoose.model('AetnaNormal', SchemaNormal);
    var FindAetnaCount = 0;
    try
    {
        mongoose.connect(ConnectString);
    } catch (err) {
        return (err);
    };
    db.on("error", console.error.bind(console, "connection error:"));
    try
    {
        FindAetna.count({}, function (err, count)
        {
            FindAetnaCount = count;
        });
    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    try
    {
        FindAetna.find({}, function (err, docs)
        {
            if (err) return console.error(err);
            var i = 0;
            var CurPlanType;
            while (i < FindAetnaCount)
            {
                if (docs[i].Plan.indexOf('HMO') >= 0) CurPlanType = 'HMO';
                else CurPlanType = 'PPO';
                NewAetnaNormal = new AetnaNormal({
                    User: docs[i].User,
                    Network : 'Aetna',
                    PlanName: docs[i].Plan,
                    PlanType: CurPlanType,
                    FilePath: docs[i].Path,
                    Deductible:
                    {
                        InNetwork:
                        {
                            Member: docs[i].Member_Benefits.Calendar_year_plan_deductible.In_network.Member,
                            Family: docs[i].Member_Benefits.Calendar_year_plan_deductible.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Member,
                            Family: docs[i].Member_Benefits.Calendar_year_plan_deductible.Out_of_network.Family
                        }
                    },
                    OOPLimit:
                    {
                        InNetwork:
                        {
                            Member: docs[i].Member_Benefits.Out_of_pocket_limit.In_network.Member,
                            Family: docs[i].Member_Benefits.Out_of_pocket_limit.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].Member_Benefits.Out_of_pocket_limit.Out_of_network.Member,
                            Family: docs[i].Member_Benefits.Out_of_pocket_limit.Out_of_network.Family
                        }
                    },
                    PCPVisit:
                    {
                        InNetwork: docs[i].Member_Benefits.Primary_care_physician_office_visit.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Primary_care_physician_office_visit.Out_of_network
                    },
                    SpecialistVisit:
                    {
                        InNetwork: docs[i].Member_Benefits.Specialist_office_visit.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Specialist_office_visit.Out_of_network
                    },
                    RxTier1:
                    {
                        InNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_1_preferred_generic.Out_of_network
                    },
                    RxTier2:
                    {
                        InNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_2_preferred_brand.Out_of_network
                    },
                    RxTier3:
                    {
                        InNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_3_nonpreferred_generic_and_brand.Out_of_network
                    },
                    RxTier4:
                    {
                        InNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Prescription_drugs.Tier_4_Aetna_Specialty_CareRx.Out_of_network
                    },
                    UrgentCare:
                    {
                        InNetwork: docs[i].Member_Benefits.Urgent_care.In_network,
                        OutOfNetwork: docs[i].Member_Benefits.Urgent_care.Out_of_network
                    }
                });
                NewAetnaNormal.save(function (err, thor)
                {
                    if (err) return console.error(err);
                });
                i++;
            }
        });
    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    mongoose.disconnect();
    return('AetnaNormal - complet.');
};


function SetDataValue(file_name, data_value)
{
    var workbook = xlsx.readFile(file_name);
    var first_sheet_name = workbook.SheetNames[0];
    var worksheet = workbook.Sheets[first_sheet_name];
    var field_name;
    var in_network;
    var out_network;
    var is_retail = 0;

    for (var i = 1; i < 300; i++)
    {
        if (worksheet["A" + i.toString()])
            field_name = worksheet["A" + i.toString()].v.trim()
        else continue;
        if (worksheet["B" + i.toString()])
        {
            in_network = worksheet["B" + i.toString()].v;
            in_network = in_network.toString().trim();
            in_network = in_network.replace(/\r\n/g, '');
            in_network = in_network.replace(/\t/g, '');
        }
        else in_network = '';
        if (worksheet["C" + i.toString()])
        {
            out_network = worksheet["C" + i.toString()].v;
            out_network = out_network.toString().trim();
            out_network = out_network.replace(/\r\n/g,'');
            out_network = out_network.replace(/\t/g,'');
        }
        else out_network = '';

        if (field_name.indexOf('PLAN DESIGN AND BENEFITS - CA') == 0)
        {
            field_name = field_name + in_network;
            data_value[1] = field_name.substring(field_name.indexOf('PLAN DESIGN AND BENEFITS - CA') + 29, field_name.indexOf('(')).trim();
            if (data_value[1].indexOf('Basic HMO ') >= 0) data_value[0] = 'Basic HMO';
            else if (data_value[1].indexOf('PrimeCare HMO Deductible ') >= 0) data_value[0] = 'PrimeCare HMO';
            else if (data_value[1].indexOf('AVN HMO ') >= 0) data_value[0] = 'Aetna Value Network HMO';
            else if (data_value[1].indexOf('Vitalidad HMO ') >= 0) data_value[0] = 'Vitalidad HMO';
            else if (data_value[1].indexOf('HMO Deductible ') >= 0) data_value[0] = 'HMO Deductible';
            else if (data_value[1].indexOf('HMO Ded ') >= 0) data_value[0] = 'HMO Deductible';
            else if (data_value[1].indexOf('HMO') >= 0) data_value[0] = 'HMO';
            else if (data_value[1].indexOf('PrimeCare MC') >= 0) data_value[0] = 'PrimeCare MC';
            else if (data_value[1].indexOf('Savings Plus ') >= 0) data_value[0] = 'Savings Plus';
            else if (data_value[1].indexOf(' MC ') > 0) data_value[0] = 'Managed Choice POS (Open Access)';
            else if (data_value[1].indexOf('PPO') > 0) data_value[0] = 'PPO';
            else data_value[0] = '';
            if (data_value[1].indexOf('HMO') > 0) data_value[2] = 'HMO'
            else if (data_value[1].indexOf('HSA') > 0) data_value[2] = 'HSA'
            else data_value[2] = 'PPO';

            if (data_value[1].indexOf('Bronze') >= 0) data_value[3] = 'Bronze'
            else if (data_value[1].indexOf('Silver') >= 0) data_value[3] = 'Silver'
            else if (data_value[1].indexOf('Gold') >= 0) data_value[3] = 'Gold'
            else if (data_value[1].indexOf('Platinum') >= 0) data_value[3] = 'Platinum'
            else data_value[3] = '';
        }
        else if (field_name.indexOf('Deductible (per calendar year)') == 0)
        {
            if ((in_network.indexOf('Individual') >= 0) && (in_network.indexOf('Family') >= 0))
            {
                data_value[4] = in_network.substring(0, in_network.indexOf('Individual')).trim();
                data_value[5] = in_network.substring(in_network.indexOf('Individual') + 10, in_network.indexOf('Family')).trim();
            }
            else
            {
                data_value[4] = in_network.trim();
                data_value[5] = in_network.trim();
            };
            if ((out_network.indexOf('Individual') >= 0) && (out_network.indexOf('Family') >= 0))
            {
                data_value[6] = out_network.substring(0, out_network.indexOf('Individual')).trim();
                data_value[7] = out_network.substring(out_network.indexOf('Individual') + 10, out_network.indexOf('Family')).trim();
            }
            else
            {
                data_value[6] = out_network.trim();
                data_value[7] = out_network.trim();
            };
        }
        else if (field_name.indexOf('Out-of-Pocket (OOP) Maximum') == 0)
        {
            if ((in_network.indexOf('Individual') >= 0) && (in_network.indexOf('Family') >= 0))
            {
                data_value[8] = in_network.substring(0, in_network.indexOf('Individual')).trim();
                data_value[9] = in_network.substring(in_network.indexOf('Individual') + 10, in_network.indexOf('Family')).trim();
            }
            else
            {
                data_value[8] = in_network.trim();
                data_value[9] = in_network.trim();
            };
            if ((out_network.indexOf('Individual') >= 0) && (out_network.indexOf('Family') >= 0))
            {
                data_value[10] = out_network.substring(0, out_network.indexOf('Individual')).trim();
                data_value[11] = out_network.substring(out_network.indexOf('Individual') + 10, out_network.indexOf('Family')).trim();
            }
            else
            {
                data_value[10] = out_network.trim();
                data_value[11] = out_network.trim();
            };
        }
        else if (field_name.indexOf('Office Visits to Non-Specialist') == 0)
        {
            data_value[12] = in_network.trim();
            data_value[13] = out_network.trim();
        }
        else if (field_name.indexOf('Specialist Office Visits') == 0)
        {
            data_value[14] = in_network.trim();
            data_value[15] = out_network.trim();
        }
        else if (field_name.indexOf('Urgent Care Provider') == 0)
        {
            data_value[16] = in_network.trim();
            data_value[17] = out_network.trim();
        }
        else if ((field_name.indexOf('Retail') == 0) && (in_network.trim() == '') && (out_network.trim() == ''))
        {
            is_retail = 1;
        }
        else if ((field_name.indexOf('Mail Order Delivery') == 0) && (is_retail == 1))
        {
            is_retail = 0;
        }
        else if ((field_name.indexOf('Generic Drugs') == 0) && (is_retail == 1))
        {
            data_value[18] = in_network.trim();
            data_value[19] = out_network.trim();
        }
        else if ((field_name.indexOf('Preferred Brand Drugs') == 0) && (is_retail == 1))
        {
            data_value[20] = in_network.trim();
            data_value[21] = out_network.trim();
        }
        else if ((field_name.indexOf('Non-Preferred Drugs') == 0) && (is_retail == 1))
        {
            data_value[22] = in_network.trim();
            data_value[23] = out_network.trim();
        }
        else if ((field_name.indexOf('Specialty Drugs') == 0) && (is_retail == 1))
        {
            data_value[24] = in_network.trim();
            data_value[25] = out_network.trim();
            break;
        };
    };
    //return (data_value);
};

exports.SaveAetnaFromExcel16 = function (path, table_name)
{
    var ConnectString = help_scripts.ConnectStr();
    var AetnaNormal = mongoose.model(table_name, SchemaNormal);
    var DelAetna = mongoose.model('Aetna', schema);
    var data_value = [];
    var file_path;
    var NewAetnaNormal;
    try
    {
        mongoose.connect(ConnectString);

    } catch (err)
    {
        return (err);
    };
    try
    {
        var items = fs.readdirSync(path);
    } catch (err)
    {
        return (err);
    };
    var j = 0;
    for (var i = 0; i < items.length; i++)
    {
        data_value.length = 0;
        if (items[i].indexOf('.xlsx') >= 0)
        {
            SetDataValue(path + items[i], data_value);
            file_path = '01.01.2016/Benefit Summaries/' + items[i].substring(0, items[i].indexOf('.xlsx')) + '.pdf';
            NewAetnaNormal = new AetnaNormal({
                User: '',
                Network: data_value[0],
                PlanName: data_value[1],
                PlanType: data_value[2],
                EffectiveDate: '01.2016',
                MetalTier: data_value[3],
                FilePath: file_path,
                Deductible:
                {
                    InNetwork:
                    {
                        Member: data_value[4],
                        Family: data_value[5]
                    },
                    OutOfNetwork:
                    {
                        Member: data_value[6],
                        Family: data_value[7]
                    }
                },
                OOPLimit:
                {
                    InNetwork:
                    {
                        Member: data_value[8],
                        Family: data_value[9]
                    },
                    OutOfNetwork:
                    {
                        Member: data_value[10],
                        Family: data_value[11]
                    }
                },
                PCPVisit:
                {
                    InNetwork: data_value[12],
                    OutOfNetwork: data_value[13]
                },
                SpecialistVisit:
                {
                    InNetwork: data_value[14],
                    OutOfNetwork: data_value[15]
                },
                UrgentCare:
                {
                    InNetwork: data_value[16],
                    OutOfNetwork: data_value[17]
                },
                RxTier1:
                {
                    InNetwork: data_value[18],
                    OutOfNetwork: data_value[19]
                },
                RxTier2:
                {
                    InNetwork: data_value[20],
                    OutOfNetwork: data_value[21]
                },
                RxTier3:
                {
                    InNetwork: data_value[22],
                    OutOfNetwork: data_value[23]
                },
                RxTier4:
                {
                    InNetwork: data_value[24],
                    OutOfNetwork: data_value[25]
                }
            });
            NewAetnaNormal.save(function (err, thor)
            {
                if (err) return console.error(err);
            });
            j++;
        };

    };
    return (data_value[0]);
};



exports.SaveAetna = function (array)
{
    var ConnectString = help_scripts.ConnectStr();
    var Aetna = mongoose.model('Aetna', schema);
    var key_str = '';
    key_str = key_str + array[1] + '|' + array[2];
    var NewAetna = new Aetna({
        User: array[0],
        Path: array[1],
        Plan: array[2],
        key_field: key_str,
        Network: array[25],
        /* PCP_Referrals_required:
         {
         In_network: array[3],
         Out_of_network: array[4]
         },*/
        Member_Benefits:
        {

            Calendar_year_plan_deductible:
            {
                In_network:
                {
                    Member: array[3],
                    Family: array[4]
                },
                Out_of_network:
                {
                    Member: array[5],
                    Family: array[6]
                }
            },
            Out_of_pocket_limit:
            {
                In_network:
                {
                    Member: array[7],
                    Family: array[8]
                },
                Out_of_network:
                {
                    Member: array[9],
                    Family: array[10]
                }
            },
            /*  Deductible_ansd_out_of_pocket_limit_accumulation:
             {
             In_network: array[13],
             Out_of_network: array[14]
             },
             Not_included_in_out_of_pocket_limit:
             {
             In_network: array[15],
             Out_of_network: array[16]
             },*/
            Primary_care_physician_office_visit:
            {
                In_network: array[11],
                Out_of_network: array[12]
            },
            Specialist_office_visit:
            {
                In_network: array[13],
                Out_of_network: array[14]
            },
            /* Preventive_care_Screenings_Immunizations:
             {
             In_network: array[21],
             Out_of_network: array[22]
             },
             Imaging:
             {
             In_network: array[23],
             Out_of_network: array[24]
             },
             Pharmacy_plan_type:
             {
             In_network: array[25],
             Out_of_network: array[26]
             },
             Prescription_drug_deductible:
             {
             In_network: array[27],
             Out_of_network: array[28]
             },
             Outpatient_surgery_OP_hospital_department:
             {
             In_network: array[29],
             Out_of_network: array[30]
             },
             Outpatient_surgery_freestanding_facility:
             {
             In_network: array[31],
             Out_of_network: array[32]
             },
             Inpatient_hospital_facility:
             {
             In_network: array[33],
             Out_of_network: array[34]
             },
             Rehabilitation_services:
             {
             In_network: array[35],
             Out_of_network: array[36]
             },
             Emergency_room:
             {
             In_network: array[37],
             Out_of_network: array[38]
             },
             Emergency_medical_transport:
             {
             In_network: array[39],
             Out_of_network: array[40]
             },*/
            Urgent_care:
            {
                In_network: array[15],
                Out_of_network: array[16]
            },
            /* Walk_in_clinics:
             {
             In_network: array[43],
             Out_of_network: array[44]
             },
             Chiropractic:
             {
             In_network: array[45],
             Out_of_network: array[46]
             },
             Adult_routine_vision:
             {
             In_network: array[47],
             Out_of_network: array[48]
             },
             Diagnostic_testing:
             {
             Lab:
             {
             In_network: array[49],
             Out_of_network: array[50]
             },
             X_ray:
             {
             In_network: array[51],
             Out_of_network: array[52]
             }
             },*/
            Prescription_drugs:
            {
                Tier_1_preferred_generic:
                {
                    In_network: array[17],
                    Out_of_network: array[18]
                },
                Tier_2_preferred_brand:
                {
                    In_network: array[19],
                    Out_of_network: array[20]
                },
                Tier_3_nonpreferred_generic_and_brand:
                {
                    In_network: array[21],
                    Out_of_network: array[22]
                },
                Tier_4_Aetna_Specialty_CareRx:
                {
                    In_network: array[23],
                    Out_of_network: array[24]
                }
            }
        }
    });

    try
    {
        mongoose.connect(ConnectString, function (err)
        {
            if (err)
                return console.error(err);
        });
    } catch (err)
    {
        return (err);
    };
    db.on("error", console.error.bind(console, "connection error:"));
    try
    {
        DelAetna.findOne({ User: array[0], Path: array[1], Plan: array[2], Network: array[25] }, function (err, doc)
        {
            if (err) return console.error(err);
            NewAetna.save(function (err, thor)
            {
                if (err) return console.error(err);
                mongoose.disconnect();
            });
        });

    } catch (err)
    {
        mongoose.disconnect();
        return (err);
    };
    return ('<caption style="font-weight:bold">' + array[0] + ', thank you for completing plan "' + array[2] + '" </caption><caption style="font-weight:bold">Company - "Aetna"</caption><caption style="font-weight:bold;">Path -' + array[1] + '</caption><caption style="font-weight:bold;">Network - ' + array[25] + '</caption>');
};