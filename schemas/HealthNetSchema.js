var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var schema = new Schema({
    User: String,
    Path: String,
    Plan: String,
    PLAN_MAXIMUMS:
    {
        Calendar_year_deductible:
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
        Out_of_pocket_maximum:
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
        }/*,
     Lifetime_benefit_maximum:
     {
     In_network: String,
     Out_of_network: String
     }*/

    },
    PROFESSIONAL_SERVICES:
    {
        /*  Ambulance_services:
         {
         In_network: String,
         Out_of_network: String
         },
         CVS_MinuteClinic_physician_visit:
         {
         In_network: String
         },
         Emergency_room_facility:
         {
         In_network: String
         },*/
        Office_visit:
        {
            In_network: String,
            Out_of_network: String
        },
        /*   Preventive_care_services_for_adults:
         {
         In_network: String,
         Out_of_network: String
         },
         Preventive_care_services_for_children:
         {
         In_network: String,
         Out_of_network: String
         },
         Preventive_care_services:
         {
         In_network: String,
         Out_of_network: String
         },
         Rehabilitation_therapy:
         {
         In_network: String,
         Out_of_network: String
         },
         Self_injectable_drugs:
         {
         In_network: String,
         Out_of_network: String
         },*/
        Specialist_visit:
        {
            In_network: String,
            Out_of_network: String
        }/*,
     Urgent_care:
     {
     In_network: String
     },
     X_ray_and_laboratory_procedures:
     {
     In_network: String,
     Out_of_network: String
     },
     Rehabilitation_and_habilitation_therapy:
     {
     In_network: String,
     Out_of_network: String
     }*/
    },
    /*   HOSPITAL_SERVICES:
     {
     Inpatient_care:
     {
     In_network: String,
     Out_of_network: String
     },
     Outpatient_facility_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Outpatient_surgery:
     {
     In_network: String,
     Out_of_network: String
     },
     Skilled_nursing_facility:
     {
     In_network: String,
     Out_of_network: String
     }
     },*/

    EMERGENCY_SERVICES:
    {
        /*   Emergency_room:
         {
         In_network: String,
         Out_of_network: String
         },*/
        Urgent_care:
        {
            In_network: String,
            Out_of_network: String
        }/*,
     Ambulance_services:
     {
     In_network: String,
     Out_of_network: String
     }*/
    },
    /* OTHER_SERVICES:
     {
     Durable_medical_equipment:
     {
     In_network: String,
     Out_of_network: String
     },
     Orthotics:
     {
     In_network: String,
     Out_of_network: String
     },
     Diabetic_equipment:
     {
     In_network: String,
     Out_of_network: String
     },
     Diabetic_supplies:
     {
     In_network: String,
     Out_of_network: String
     },
     Acupuncture_and_chiropratic_services:
     {
     In_network: String
     },
     Acupuncture:
     {
     In_network: String,
     Out_of_network: String
     },
     Chiropractic_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Prosthetics:
     {
     In_network: String,
     Out_of_network: String
     },
     Self_injectable_drugs:
     {
     In_network: String
     },
     Specialty_drugs:
     {
     In_network: String
     }
     },
     OUTPATIENT_SERVICES:
     {
     Outpatient_surgery:
     {
     In_network: String
     },
     Skilled_nursing_facility:
     {
     In_network: String
     }
     },*/
    PRESCRIPTION_DRUG_COVERAGE:
    {
        /*   Brand_name_calendar_year_deductible:
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
         Calendar_year_deductible:
         {
         In_network: String,
         Out_of_network: String
         },
         Pediatric_dental_Diagnostic_and_preventive_services:
         {
         In_network: String,
         Out_of_network: String
         },
         Prescription_drug_deductible:
         {
         In_network: String
         },*/
        Prescription_drugs_1:
        {
            In_network: String,
            Out_of_network: String
        },
        Prescription_drugs_2:
        {
            In_network: String,
            Out_of_network: String
        },
        Prescription_drugs_3:
        {
            In_network: String,
            Out_of_network: String
        }/*,
     Specialty_drugs:
     {
     Out_of_network: String
     }*/
    }/*,
     PEDIATRIC_DENTAL:
     {
     Diagnostic_and_preventive_services:
     {
     In_network: String
     }
     },
     PEDIATRIC_VISION:
     {
     Eye_exam:
     {
     In_network: String,
     Out_of_network: String
     },
     Glasses:
     {
     In_network: String,
     Out_of_network: String
     },
     Routine_eye_exam:
     {
     In_network: String
     },

     Unlimited_lifetime_maximum:
     {
     In_network: String,
     Out_of_network: String
     }
     }*/

});

var SchemaNormal = new Schema({
    User     : String,
    Network  : String,
    PlanName : String,
    PlanType : String,
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

exports.CopyCheckHealthNet = function (array, collection_name)
{
    var ConnectString = help_scripts.ConnectStr();
    var i, j;
    var HealthNet_source = mongoose.model('HealthNet', schema);
    var HealthNet_copy = mongoose.model(collection_name, SchemaNormal);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    for (i = 0; i < array.length; i++)
    {
        HealthNet_source.find({ Path: array[i] }, function (err, doc)
        {
            var check_array = [];
            var data_array = [];
            var m;
            var CurPlanType = '';
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Plan;
            data_array[0] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Member;
            data_array[1] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Family;
            data_array[2] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Member;
            data_array[3] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Family;
            data_array[4] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Member;
            data_array[5] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Family;
            data_array[6] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Member;
            data_array[7] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Family;
            data_array[8] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PROFESSIONAL_SERVICES.Office_visit.In_network;
            data_array[9] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PROFESSIONAL_SERVICES.Office_visit.Out_of_network;
            data_array[10] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PROFESSIONAL_SERVICES.Specialist_visit.In_network;
            data_array[11] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PROFESSIONAL_SERVICES.Specialist_visit.Out_of_network;
            data_array[12] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].EMERGENCY_SERVICES.Urgent_care.In_network;
            data_array[13] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].EMERGENCY_SERVICES.Urgent_care.Out_of_network;
            data_array[14] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.In_network;
            data_array[15] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.Out_of_network;
            data_array[16] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.In_network;
            data_array[17] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.Out_of_network;
            data_array[18] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.In_network;
            data_array[19] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.Out_of_network;
            data_array[20] = help_scripts.GetCorrField(check_array);
            if (data_array[0].indexOf('HMO') >= 0) CurPlanType = 'HMO';
            else CurPlanType = 'PPO';
            var NewHealthNet = new HealthNet_copy({
                FilePath: doc[0].Path,
                Network : 'HealthNet',
                PlanName: data_array[0],
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
                    InNetwork: data_array[19],
                    OutOfNetwork: data_array[20]
                }
            });
            try
            {
                NewHealthNet.save(function (err, thor)
                {
                    if (err) return console.error(err);
                });
            } catch (err)
            {
                mongoose.disconnect();
                return (err);
            };
        });

    };
    return ('Copying of "HealthNet" in a collection "' + collection_name + '" took place successfully');
}

exports.SetCheckHealthNet = function (res)
{
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var paths = [];
    var result_str = '';
    var FindHealthNet = mongoose.model('HealthNet', schema);
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
        FindHealthNet.distinct('Path', {}, function (err, paths)
        {
            if (err) return console.error(err);
            FindHealthNet.find({}, function (err, docs)
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

                    k = 0;
                    i = 0;
                    cur_docs.length = 0;
                    while (k < docs.length)
                    {
                        if (paths[j] == docs[k].Path)
                        {
                            cur_docs[i] = docs[k];
                            i++;
                        };
                        k++;
                    }
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Plan;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Office_visit.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Office_visit.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Specialist_visit.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Specialist_visit.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].EMERGENCY_SERVICES.Urgent_care.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].EMERGENCY_SERVICES.Urgent_care.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    result_str = result_str + '<tr><td name=>' + paths[j] + '</td><td>' + count_result[j] + '</td><td>';
                    if (count_result[j] == 0)
                        result_str = result_str + '<input type="checkbox" name="check_result' + j.toString() + '"></td></tr>';
                    else
                        result_str = result_str + '<input type="hidden" name="check_result' + j.toString() + '"></td></tr>';
                    result_str = result_str + '<input type="hidden" id="paths_result' + j.toString() + '" name="paths_result' + j.toString() + '" value="' + paths[j] + '">';
                    j++;
                }
                result_str = result_str + '<input type="hidden" id="count_str" name="count_str" value="' + j.toString() + '">';
                str = fs.readFileSync('./inputpages/HealthNet_result.html', "utf-8") + result_str;
                mongoose.disconnect();
                res.send(str);
            });

        });
    } catch (err)
    {
        mongoose.disconnect();
        return (err);
    };
    //mongoose.disconnect();
}

exports.SetHealthNetNormal = function ()
{
    var HealthNetCount = 0;
    var NewHealthNetNormal;
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var FindHealthNet = mongoose.model('HealthNet', schema);
    var HealthNetNormal = mongoose.model('HealthNetNormal', SchemaNormal);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err) {
        return (err);
    };
    var FindHealthNetCount = 0;
    db.on("error", console.error.bind(console, "connection error:"));

    try
    {
        FindHealthNet.count({}, function (err, count)
        {
            FindHealthNetCount = count;
        });
    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    try
    {
        FindHealthNet.find({}, function (err, docs)
        {

            var i = 0;
            var CurPlanType;
            while (i < FindHealthNetCount)
            {
                if (docs[i].Plan.indexOf('HMO') >= 0) CurPlanType = 'HMO';
                else CurPlanType = 'PPO';
                NewHealthNetNormal = new HealthNetNormal({
                    User: docs[i].User,
                    Network : 'HealthNet',
                    PlanName: docs[i].Plan,
                    PlanType: CurPlanType,
                    FilePath: docs[i].Path,
                    Deductible:
                    {
                        InNetwork:
                        {
                            Member: docs[i].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Member,
                            Family: docs[i].PLAN_MAXIMUMS.Calendar_year_deductible.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Member,
                            Family: docs[i].PLAN_MAXIMUMS.Calendar_year_deductible.Out_of_network.Family
                        }
                    },
                    OOPLimit:
                    {
                        InNetwork:
                        {
                            Member: docs[i].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Member,
                            Family: docs[i].PLAN_MAXIMUMS.Out_of_pocket_maximum.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Member,
                            Family: docs[i].PLAN_MAXIMUMS.Out_of_pocket_maximum.Out_of_network.Family
                        }
                    },
                    PCPVisit:
                    {
                        InNetwork: docs[i].PROFESSIONAL_SERVICES.Office_visit.In_network,
                        OutOfNetwork: docs[i].PROFESSIONAL_SERVICES.Office_visit.Out_of_network
                    },
                    SpecialistVisit:
                    {
                        InNetwork: docs[i].PROFESSIONAL_SERVICES.Specialist_visit.In_network,
                        OutOfNetwork: docs[i].PROFESSIONAL_SERVICES.Specialist_visit.Out_of_network
                    },
                    RxTier1:
                    {
                        InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_1.Out_of_network
                    },
                    RxTier2:
                    {
                        InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_2.Out_of_network
                    },
                    RxTier3:
                    {
                        InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Prescription_drugs_3.Out_of_network
                    },
                    RxTier4:
                    {
                        InNetwork: '',
                        OutOfNetwork: ''
                    },
                    UrgentCare:
                    {
                        InNetwork: docs[i].EMERGENCY_SERVICES.Urgent_care.In_network,
                        OutOfNetwork: docs[i].EMERGENCY_SERVICES.Urgent_care.Out_of_network
                    }
                });
                NewHealthNetNormal.save(function (err, thor)
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
    return('HealthNetNormal - complet.');
};


exports.SaveHealthNet = function (array)
{
    var ConnectString = help_scripts.ConnectStr();
    var HealthNet = mongoose.model('HealthNet', schema);
    var DelHealthNet = mongoose.model('HealthNet', schema);

    var NewHealthNet = new HealthNet({
        User: array[0],
        Path: array[1],
        Plan: array[2],
        PLAN_MAXIMUMS:
        {
            Calendar_year_deductible:
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
            Out_of_pocket_maximum:
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
            }/*,
         Lifetime_benefit_maximum:
         {
         In_network: array[11],
         Out_of_network: array[12]
         }*/

        },
        PROFESSIONAL_SERVICES:
        {
            /*  Ambulance_services:
             {
             In_network: array[13],
             Out_of_network: array[14]
             },
             CVS_MinuteClinic_physician_visit:
             {
             In_network: array[15]
             },
             Emergency_room_facility:
             {
             In_network: array[16]
             },*/
            Office_visit:
            {
                In_network: array[11],
                Out_of_network: array[12]
            },
            /*  Preventive_care_services_for_adults:
             {
             In_network: array[19],
             Out_of_network: array[20]
             },
             Preventive_care_services_for_children:
             {
             In_network: array[21],
             Out_of_network: array[22]
             },
             Preventive_care_services:
             {
             In_network: array[23],
             Out_of_network: array[24]
             },
             Rehabilitation_therapy:
             {
             In_network: array[25],
             Out_of_network: array[26]
             },
             Self_injectable_drugs:
             {
             In_network: array[27],
             Out_of_network: array[28]
             },*/
            Specialist_visit:
            {
                In_network: array[13],
                Out_of_network: array[14]
            }/*,
         Urgent_care:
         {
         In_network: array[31]
         },
         X_ray_and_laboratory_procedures:
         {
         In_network: array[32],
         Out_of_network: array[33]
         },
         Rehabilitation_and_habilitation_therapy:
         {
         In_network: array[34],
         Out_of_network: array[35]
         }*/
        },
        /*    HOSPITAL_SERVICES:
         {
         Inpatient_care:
         {
         In_network: array[36],
         Out_of_network: array[37]
         },
         Outpatient_facility_services:
         {
         In_network: array[38],
         Out_of_network: array[39]
         },
         Outpatient_surgery:
         {
         In_network: array[40],
         Out_of_network: array[41]
         },
         Skilled_nursing_facility:
         {
         In_network: array[42],
         Out_of_network: array[43]
         }
         },*/

        EMERGENCY_SERVICES:
        {
            /*   Emergency_room:
             {
             In_network: array[44],
             Out_of_network: array[45]
             },*/
            Urgent_care:
            {
                In_network: array[15],
                Out_of_network: array[16]
            }/*,
         Ambulance_services:
         {
         In_network: array[48],
         Out_of_network: array[49]
         }*/
        },
        /*      OTHER_SERVICES:
         {
         Durable_medical_equipment:
         {
         In_network: array[50],
         Out_of_network: array[51]
         },
         Orthotics:
         {
         In_network: array[52],
         Out_of_network: array[53]
         },
         Diabetic_equipment:
         {
         In_network: array[54],
         Out_of_network: array[55]
         },
         Diabetic_supplies:
         {
         In_network: array[56],
         Out_of_network: array[57]
         },
         Acupuncture_and_chiropratic_services:
         {
         In_network: array[58]
         },
         Acupuncture:
         {
         In_network: array[59],
         Out_of_network: array[60]
         },
         Chiropractic_services:
         {
         In_network: array[61],
         Out_of_network: array[62]
         },
         Prosthetics:
         {
         In_network: array[63],
         Out_of_network: array[64]
         },
         Self_injectable_drugs:
         {
         In_network: array[65]
         },
         Specialty_drugs:
         {
         In_network: array[66]
         }
         },
         OUTPATIENT_SERVICES:
         {
         Outpatient_surgery:
         {
         In_network: array[67]
         },
         Skilled_nursing_facility:
         {
         In_network: array[68]
         }
         },*/
        PRESCRIPTION_DRUG_COVERAGE:
        {
            /*  Brand_name_calendar_year_deductible:
             {
             In_network:
             {
             Member: array[69],
             Family: array[70]
             },
             Out_of_network:
             {
             Member: array[71],
             Family: array[72]
             }
             },
             Calendar_year_deductible:
             {
             In_network: array[73],
             Out_of_network: array[74]
             },
             Pediatric_dental_Diagnostic_and_preventive_services:
             {
             In_network: array[75],
             Out_of_network: array[76]
             },
             Prescription_drug_deductible:
             {
             In_network: array[77]
             },*/
            Prescription_drugs_1:
            {
                In_network: array[17],
                Out_of_network: array[18]
            },
            Prescription_drugs_2:
            {
                In_network: array[19],
                Out_of_network: array[20]
            },
            Prescription_drugs_3:
            {
                In_network: array[21],
                Out_of_network: array[22]
            }/*,
         Specialty_drugs:
         {
         Out_of_network: array[84]
         }*/
        }/*,
         PEDIATRIC_DENTAL:
         {
         Diagnostic_and_preventive_services:
         {
         In_network: array[85]
         }
         },
         PEDIATRIC_VISION:
         {
         Eye_exam:
         {
         In_network: array[86],
         Out_of_network: array[87]
         },
         Glasses:
         {
         In_network: array[88],
         Out_of_network: array[89]
         },
         Routine_eye_exam:
         {
         In_network: array[90]
         },

         Unlimited_lifetime_maximum:
         {
         In_network: array[91],
         Out_of_network: array[92]
         }
         }*/
    });
    try
    {
        mongoose.connect(ConnectString, function (err)
        {
            if (err)  return console.error(err);
        });
    } catch (err) {
        return (err);
    };
    try
    {
        DelHealthNet.findOneAndRemove({ User: array[0], Path: array[1]}, function (err, doc)
        {
            if (err) return console.error(err);
            NewHealthNet.save(function (err, thor){
                if (err) return console.error(err);
                mongoose.disconnect();
            });
        });

    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    return ('<caption style="font-weight:bold">'+array[0]+', thank you for completing plan "'+array[2]+'" </caption><caption style="font-weight:bold">Company - "HealthNet"</caption><caption style="font-weight:bold">Path -' + array[1] + '</caption>');
};

