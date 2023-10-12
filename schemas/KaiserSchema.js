var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts')
var db = mongoose.connection;

var Schema = mongoose.Schema;

var schema = new Schema({
    User: String,
    Path: String,
    Plan: String,
    ANNUAL_PLAN_DEDUCTIBLE:
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
    ANNUAL_OUT_OF_POCKET_MAXIMUM:
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
    /* MAXIMUM_BENEFIT_WHILE_INSURED:
     {
     In_network: String,
     Out_of_network: String
     },
     PHARMACY_ANNUAL_DEDUCTIBLE:
     {
     Brand_name_drugs:
     {
     In_network: String,
     Out_of_network: String
     }
     },*/
    IN_THE_MEDICAL_OFFICE:
    {
        Primary_care_visits:
        {
            In_network: String,
            Out_of_network: String
        },
        Urgent_care_visits:
        {
            In_network: String,
            Out_of_network: String
        },
        Specialt_office_visits:
        {
            In_network: String,
            Out_of_network: String
        }/*,
     Preventive_exams:
     {
     In_network: String,
     Out_of_network: String
     },
     Prenatal_care:
     {
     In_network: String,
     Out_of_network: String
     },
     Postpartum_care:
     {
     In_network: String,
     Out_of_network: String
     },
     Well_child_preventive_care_visits:
     {
     In_network: String,
     Out_of_network: String
     },
     Vaccines:
     {
     In_network: String,
     Out_of_network: String
     },
     Allergy_injections:
     {
     In_network: String,
     Out_of_network: String
     },
     Infertility_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Occupational_physical_and_speech_therapy:
     {
     In_network: String,
     Out_of_network: String
     },
     Most_laboratory_tests:
     {
     In_network: String,
     Out_of_network: String
     },
     Most_X_rays_and_diagnostic:
     {
     In_network: String,
     Out_of_network: String
     },
     Most_MRI_CT_PET_scans:
     {
     In_network: String,
     Out_of_network: String
     },
     Outpatient_surgery:
     {
     In_network: String,
     Out_of_network: String
     } */
    },
    /* EMERGENCY_SERVICES:
     {
     Emergency_Department_visits:
     {
     In_network: String,
     Out_of_network: String
     },
     Ambulance:
     {
     In_network: String,
     Out_of_network: String
     }
     },*/
    PRESCRIPTIONS:
    {
        Generic_drugs:
        {
            In_network: String,
            Out_of_network: String
        },
        Brand_name_drugs:
        {
            In_network: String,
            Out_of_network: String
        }
    }/*,
     HOSPITAL_CARE:
     {
     Physicians_services_room_and_board_tests_medications_supplies_therapies_birth_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Skilled_nursing_facility_care:
     {
     In_network: String,
     Out_of_network: String
     }
     },
     MENTAL_HEALTH_SERVICES:
     {
     In_the_medical_office:
     {
     In_network: String,
     Out_of_network: String
     },
     In_the_hospital:
     {
     In_network: String,
     Out_of_network: String
     }
     },
     CHEMICAL_DEPENDENCY_SERVICES:
     {
     In_the_medical_office:
     {
     In_network: String,
     Out_of_network: String
     },
     In_the_hospital:
     {
     In_network: String,
     Out_of_network: String
     }
     },
     OTHER:
     {
     Certain_durable_medical_equipment:
     {
     In_network: String,
     Out_of_network: String
     },
     Certain_prosthetic_and_orthotic_devices:
     {
     In_network: String,
     Out_of_network: String
     },
     Pediatric_optical:
     {
     In_network: String,
     Out_of_network: String
     },
     Pediatric_vision_exam:
     {
     In_network: String,
     Out_of_network: String
     },
     Adult_optical:
     {
     In_network: String,
     Out_of_network: String
     },
     Adult_vision_exam:
     {
     In_network: String,
     Out_of_network: String
     },
     Home_health_care:
     {
     In_network: String,
     Out_of_network: String
     },
     Hospice_care:
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
    key_field: String,
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
    RxGenericTier1:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxBrandTier2:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxNonFormularyTier3:
    {
        InNetwork: String,
        OutOfNetwork: String
    },
    RxNonPreferredTier4:
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

exports.CopyCheckKaisers = function (array, collection_name)
{
    var ConnectString = help_scripts.ConnectStr();
    var i, j;
    var Kaiser_source = mongoose.model('Kaiser', schema);
    var Kaiser_copy = mongoose.model(collection_name, SchemaNormal);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    for (i = 0; i < array.length; i++)
    {
        Kaiser_source.find({ Path: array[i] }, function (err, doc)
        {
            var check_array = [];
            var data_array = [];
            var m;
            var CurPlanType = '';
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Plan;
            data_array[0] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_PLAN_DEDUCTIBLE.In_network.Member;
            data_array[1] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_PLAN_DEDUCTIBLE.In_network.Family;
            data_array[2] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Member;
            data_array[3] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Family;
            data_array[4] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Member;
            data_array[5] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Family;
            data_array[6] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Member;
            data_array[7] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Family;
            data_array[8] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Primary_care_visits.In_network;
            data_array[9] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Primary_care_visits.Out_of_network;
            data_array[10] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.In_network;
            data_array[11] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.Out_of_network;
            data_array[12] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.In_network;
            data_array[13] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.Out_of_network;
            data_array[14] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTIONS.Generic_drugs.In_network;
            data_array[15] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTIONS.Generic_drugs.Out_of_network;
            data_array[16] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTIONS.Brand_name_drugs.In_network;
            data_array[17] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTIONS.Brand_name_drugs.Out_of_network;
            data_array[18] = help_scripts.GetCorrField(check_array);
            if (data_array[0].indexOf('PPO') >= 0) CurPlanType = 'PPO';
            else CurPlanType = 'HMO';
            var NewKaiser = new Kaiser_copy({
                FilePath: doc[0].Path,
                PlanName: data_array[0],
                Network : 'Kaiser',
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
                UrgentCare:
                {
                    InNetwork: data_array[11],
                    OutOfNetwork: data_array[12]
                },
                SpecialistVisit:
                {
                    InNetwork: data_array[13],
                    OutOfNetwork: data_array[14]
                },

                RxGenericTier1:
                {
                    InNetwork: data_array[15],
                    Out_of_network: data_array[16]
                },
                RxBrandTier2:
                {
                    InNetwork: data_array[17],
                    OutOfNetwork: data_array[18]
                },
                RxNonFormularyTier3:
                {
                    InNetwork: data_array[17],
                    OutOfNetwork: data_array[18]
                },
                RxNonPreferredTier4:
                {
                    InNetwork: data_array[17],
                    OutOfNetwork: data_array[18]
                }

            });
            try
            {
                NewKaiser.save(function (err, thor)
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
    return ('Copying of "Kaiser" in a collection "' + collection_name + '" took place successfully');
}

exports.SetCheckKaiser = function (res)
{
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var paths = [];
    var result_str = '';
    var FindKaiser = mongoose.model('Kaiser', schema);
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
        FindKaiser.distinct('Path', {}, function (err, paths)
        {
            if (err) return console.error(err);
            FindKaiser.find({}, function (err, docs)
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
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_PLAN_DEDUCTIBLE.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_PLAN_DEDUCTIBLE.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Primary_care_visits.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Primary_care_visits.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTIONS.Generic_drugs.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTIONS.Generic_drugs.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTIONS.Brand_name_drugs.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTIONS.Brand_name_drugs.Out_of_network;
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
                str = fs.readFileSync('./inputpages/Kaiser_result.html', "utf-8") + result_str;
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

exports.SetKaiserNormal = function ()
{
    var NewKaiserNormal;
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var FindKaiser = mongoose.model('Kaisers', schema);
    var KaiserNormal = mongoose.model('KaiserNormal', SchemaNormal);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err) {
        return (err);
    };
    //var FindKaiserCount = 0;
    db.on("error", console.error.bind(console, "connection error:"));
    try
    {
        FindKaiser.find({}, function (err, docs)
        {

            var i = 0;
            var CurPlanType;
            while (i < docs.length)
            {
                if (docs[i].Plan.indexOf('HMO') >= 0) CurPlanType = 'HMO';
                else CurPlanType = 'PPO';
                NewKaiserNormal = new KaiserNormal({
                    User: docs[i].User,
                    Network : 'Kaiser',
                    PlanName: docs[i].Plan,
                    PlanType: CurPlanType,
                    FilePath: docs[i].Path,
                    key_field: docs[i].Path+'|'+docs[i].Plan,
                    Deductible:
                    {
                        InNetwork:
                        {
                            Member: docs[i].ANNUAL_PLAN_DEDUCTIBLE.In_network.Member,
                            Family: docs[i].ANNUAL_PLAN_DEDUCTIBLE.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Member,
                            Family: docs[i].ANNUAL_PLAN_DEDUCTIBLE.Out_of_network.Family
                        }
                    },
                    OOPLimit:
                    {
                        InNetwork:
                        {
                            Member: docs[i].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Member,
                            Family: docs[i].ANNUAL_OUT_OF_POCKET_MAXIMUM.In_network.Family
                        },
                        OutOfNetwork:
                        {
                            Member: docs[i].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Member,
                            Family: docs[i].ANNUAL_OUT_OF_POCKET_MAXIMUM.Out_of_network.Family
                        }
                    },
                    PCPVisit:
                    {
                        InNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Primary_care_visits.In_network,
                        OutOfNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Primary_care_visits.Out_of_network
                    },
                    SpecialistVisit:
                    {
                        InNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.In_network,
                        OutOfNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Specialt_office_visits.Out_of_network
                    },
                    RxGenericTier1:
                    {
                        InNetwork: docs[i].PRESCRIPTIONS.Generic_drugs.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTIONS.Generic_drugs.Out_of_network
                    },
                    RxBrandTier2:
                    {
                        InNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.Out_of_network
                    },
                    RxNonFormularyTier3:
                    {
                        InNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.Out_of_network
                    },
                    RxNonPreferredTier4:
                    {
                        InNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.In_network,
                        OutOfNetwork: docs[i].PRESCRIPTIONS.Brand_name_drugs.Out_of_network
                    },
                    UrgentCare:
                    {
                        InNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.In_network,
                        OutOfNetwork: docs[i].IN_THE_MEDICAL_OFFICE.Urgent_care_visits.Out_of_network
                    }
                });
                NewKaiserNormal.save(function (err, thor)
                {
                    if (err) return console.error(err);
                    console.dir(thor);
                });
                i++;
            }
        });
    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    //mongoose.disconnect();

    return('KaiserNormal - complet.');
};

exports.DelKaiser = function (array)
{
    var ConnectString = help_scripts.ConnectStr();
    var DelKaiser = mongoose.model('Kaiser', schema);
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    db.on("error", console.error.bind(console, "connection error:"));
    db.once("open", function callback()
    {
        console.log("Connected!")
    });
    try
    {
        DelKaiser.findOneAndRemove({ User: array[0], Path: array[1]}, function (err, doc)
        {
            if (err) return console.error(err);
        });
    } catch (err)
    {
        mongoose.disconnect();
        return (err);
    };
    mongoose.disconnect();
    return ("");
};

exports.SaveKaiser = function (array)
{
    var ConnectString = help_scripts.ConnectStr();
    var Kaiser = mongoose.model('Kaiser', schema);
    var DelKaiser = mongoose.model('Kaiser', schema);
    var NewKaiser = new Kaiser({
        User: array[0],
        Path: array[1],
        Plan: array[2],
        ANNUAL_PLAN_DEDUCTIBLE:
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
        ANNUAL_OUT_OF_POCKET_MAXIMUM:
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
        /* MAXIMUM_BENEFIT_WHILE_INSURED:
         {
         In_network: array[11],
         Out_of_network: array[12]
         },
         PHARMACY_ANNUAL_DEDUCTIBLE:
         {
         Brand_name_drugs:
         {
         In_network: array[13],
         Out_of_network: array[14]
         }
         },*/
        IN_THE_MEDICAL_OFFICE:
        {
            Primary_care_visits:
            {
                In_network: array[11],
                Out_of_network: array[12]
            },
            Urgent_care_visits:
            {
                In_network: array[13],
                Out_of_network: array[14]
            },
            Specialt_office_visits:
            {
                In_network: array[15],
                Out_of_network: array[16]
            }/*,
         Preventive_exams:
         {
         In_network: array[21],
         Out_of_network: array[22]
         },
         Prenatal_care:
         {
         In_network: array[23],
         Out_of_network: array[24]
         },
         Postpartum_care:
         {
         In_network: array[25],
         Out_of_network: array[26]
         },
         Well_child_preventive_care_visits:
         {
         In_network: array[27],
         Out_of_network: array[28]
         },
         Vaccines:
         {
         In_network: array[29],
         Out_of_network: array[30]
         },
         Allergy_injections:
         {
         In_network: array[31],
         Out_of_network: array[32]
         },
         Infertility_services:
         {
         In_network: array[33],
         Out_of_network: array[34]
         },
         Occupational_physical_and_speech_therapy:
         {
         In_network: array[35],
         Out_of_network: array[36]
         },
         Most_laboratory_tests:
         {
         In_network: array[37],
         Out_of_network: array[38]
         },
         Most_X_rays_and_diagnostic:
         {
         In_network: array[39],
         Out_of_network: array[40]
         },
         Most_MRI_CT_PET_scans:
         {
         In_network: array[41],
         Out_of_network: array[42]
         },
         Outpatient_surgery:
         {
         In_network: array[43],
         Out_of_network: array[44]
         } */
        },
        /*EMERGENCY_SERVICES:
         {
         Emergency_Department_visits:
         {
         In_network: array[45],
         Out_of_network: array[46]
         },
         Ambulance:
         {
         In_network: array[47],
         Out_of_network: array[48]
         }
         },*/
        PRESCRIPTIONS:
        {
            Generic_drugs:
            {
                In_network: array[17],
                Out_of_network: array[18]
            },
            Brand_name_drugs:
            {
                In_network: array[19],
                Out_of_network: array[20]
            }
        }/*,
         HOSPITAL_CARE:
         {
         Physicians_services_room_and_board_tests_medications_supplies_therapies_birth_services:
         {
         In_network: array[53],
         Out_of_network: array[54]
         },
         Skilled_nursing_facility_care:
         {
         In_network: array[55],
         Out_of_network: array[56]
         }
         },
         MENTAL_HEALTH_SERVICES:
         {
         In_the_medical_office:
         {
         In_network: array[57],
         Out_of_network: array[58]
         },
         In_the_hospital:
         {
         In_network: array[59],
         Out_of_network: array[60]
         }
         },
         CHEMICAL_DEPENDENCY_SERVICES:
         {
         In_the_medical_office:
         {
         In_network: array[61],
         Out_of_network: array[62]
         },
         In_the_hospital:
         {
         In_network: array[63],
         Out_of_network: array[64]
         }
         },
         OTHER:
         {
         Certain_durable_medical_equipment:
         {
         In_network: array[65],
         Out_of_network: array[66]
         },
         Certain_prosthetic_and_orthotic_devices:
         {
         In_network: array[67],
         Out_of_network: array[68]
         },
         Pediatric_optical:
         {
         In_network: array[69],
         Out_of_network: array[70]
         },
         Pediatric_vision_exam:
         {
         In_network: array[71],
         Out_of_network: array[72]
         },
         Adult_optical:
         {
         In_network: array[73],
         Out_of_network: array[74]
         },
         Adult_vision_exam:
         {
         In_network: array[75],
         Out_of_network: array[76]
         },
         Home_health_care:
         {
         In_network: array[77],
         Out_of_network: array[78]
         },
         Hospice_care:
         {
         In_network: array[79],
         Out_of_network: array[80]
         }
         }*/
    });
    try
    {
        mongoose.connect(ConnectString, function (err)
        {
            if (err) return console.error(err);
        });
    } catch (err)
    {
        return (err);
    };

    try
    {
        DelKaiser.findOneAndRemove({ User: array[0], Path: array[1]}, function (err, doc)
        {
            if (err) return console.error(err);
            NewKaiser.save(function (err, thor)
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

    return ('<caption style="font-weight:bold">'+array[0]+', thank you for completing plan "'+array[2]+'" </caption><caption style="font-weight:bold">Company - "Kaiser"</caption><caption style="font-weight:bold">Path -' + array[1] + '</caption>');
};