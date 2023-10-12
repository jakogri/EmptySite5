var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var schema = new Schema({
 User: String,
 Path: String,
 Plan: String,
 Network: String,
 Covered_Medical_Benefits:
 {
  Overall_Deductible:
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
  Out_of_Pocket_Limit:
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
  Doctor_Home_and_Office_Services:
  {
   /* Acupuncture:
    {
    In_network: String,
    Out_of_network: String
    },
    Chemo_radiation_therapy:
    {
    In_network: String,
    Out_of_network: String
    },
    Chiropractor_services:
    {
    In_network: String,
    Out_of_network: String
    },
    Hemodialysis:
    {
    In_network: String,
    Out_of_network: String
    },
    On_line_visit:
    {
    In_network: String,
    Out_of_network: String
    },
    Post_natal_care:
    {
    In_network: String,
    Out_of_network: String
    },
    Prenatal_and_post_natal_visit:
    {
    In_network: String,
    Out_of_network: String
    },
    Prenatal_care:
    {
    In_network: String,
    Out_of_network: String
    },
    Prescription_drugs:
    {
    In_network: String,
    Out_of_network: String
    },
    Preventive_care:
    {
    In_network: String,
    Out_of_network: String
    },*/
   Primary_care_visit_to_treat_an_injury_or_illness:
   {
    In_network: String,
    Out_of_network: String
   },
   Specialist_care_visit:
   {
    In_network: String,
    Out_of_network: String
   }/* ,
   Other_practitioner_visits:
   {
   Acupuncture:
   {
   In_network: String,
   Out_of_network: String
   },
   Chiropractor_services:
   {
   In_network: String,
   Out_of_network: String
   },
   Retail_health_clinic:
   {
   In_network: String,
   Out_of_network: String
   },
   Allergy_testing:
   {
   In_network: String,
   Out_of_network: String
   },
   Chemo_radiation_therapy:
   {
   In_network: String,
   Out_of_network: String
   }
   },
   Other_services_in_an_office:
   {
   Hemodialysis:
   {
   In_network: String,
   Out_of_network: String
   },
   Prescription_drugs:
   {
   In_network: String,
   Out_of_network: String
   }
   }*/
  },
  Diagnostic_Services:
  {
   /*Lab:
    {
    Outpatient_hospital:
    {
    In_network: String,
    Out_of_network: String
    },
    Office:
    {
    In_network: String,
    Out_of_network: String
    }
    },
    X_ray:
    {
    Outpatient_hospital:
    {
    In_network: String,
    Out_of_network: String
    }
    },
    Advanced_diagnostic_imaging:
    {
    Office:
    {
    In_network: String,
    Out_of_network: String
    },
    Outpatient_hospital:
    {
    In_network: String,
    Out_of_network: String
    }
    },*/
   Emergency_and_Urgent_Care:
   {
    /* Emergency_room_facility_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Emergency_room_doctor_and_other_services:
     {
     In_network: String,
     Out_of_network: String
     },
     Ambulance:
     {
     In_network: String,
     Out_of_network: String
     },*/
    Urgent_care:
    {
     In_network: String,
     Out_of_network: String
    }/*,
    Doctor_services:
    {
    In_network: String,
    Out_of_network: String
    }*/
   }
  }/* ,
  Outpatient_Mental_Behavioral_Health_and_Substance_Abuse:
  {
  Doctor_office_visit:
  {
  In_network: String,
  Out_of_network: String
  },
  Doctor_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Facility_visit:
  {
  Facility_fees:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  },
  Outpatient_Surgery:
  {
  Doctor_and_other_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Hospital:
  {
  In_network: String,
  Out_of_network: String
  },
  Facility_fee:
  {
  Freestanding_surgical_center:
  {
  In_network: String,
  Out_of_network: String
  },
  Hospital:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  },
  Hospital_Stay:
  {
  Doctor_and_other_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Visit_our_Website_to_learn_which_in_network_facilities_are_consideredTier_1_and_therefore_may_result_in_lower_cost_sharing_for_you:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Recovery_and_Rehabilitation:
  {
  Cardiac_rehabilitation:
  {
  In_network: String,
  Out_of_network: String
  },
  Durable_medical_equipment_and_prosthetics:
  {
  In_network: String,
  Out_of_network: String
  },
  Durable_medical_equipment:
  {
  In_network: String,
  Out_of_network: String
  },
  Home_health_care:
  {
  In_network: String,
  Out_of_network: String
  },
  Limited_to_100_days_per_year:
  {
  In_network: String,
  Out_of_network: String
  },
  Orthotics_prosthetics_and_special_footwear:
  {
  In_network: String,
  Out_of_network: String
  },
  Rehabilitation_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Skilled_nursing_care:
  {
  In_network: String,
  Out_of_network: String
  },
  Visit_our_Website_to_learn_which_in_network_facilities_are_considered_Tier_1_and_therefore:
  {
  In_network: String,
  Out_of_network: String
  },
  may_result_in_lower_cost_sharing_for_you_Limited_to_100_days_per_year:
  {
  In_network: String,
  Out_of_network: String
  },
  Rehabilitation_services:
  {
  Office:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  }*/
 },
 Covered_Prescription_Drug_Benefits:
 {
  Retail_Prescription_Drug_Coverage:
  {
   /* Drug_tier_4_per_prescription_maximum_cost_share:
    {
    In_network: String,
    Out_of_network: String
    },
    Deductible:
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
    },*/
   Drug_tier_1:
   {
    In_network: String,
    Out_of_network: String
   },
   Drug_tier_2:
   {
    In_network: String,
    Out_of_network: String
   },
   Drug_tier_3:
   {
    In_network: String,
    Out_of_network: String
   },
   Drug_tier_4:
   {
    In_network: String,
    Out_of_network: String
   }/*,
   Elective_contact_lenses:
   {
   In_network: String
   },
   Frames:
   {
   In_network: String
   },
   Lenses:
   {
   In_network: String
   }
   },
   Children_Dental_Essential_Health_Benefits:
   {
   Basic_services:
   {
   In_network: String
   }*/
  }
 }/*,
  Covered_Vision_Benefits:
  {
  This_is_a_brief_outline_of_your_vision_coverage_Not_all_cost_shares_for_covered_services_are_shown_below_For_a_full_list_including_benefits_exclusions_and_limitations_see_the_combined_Evidence_of_Coverage_Disclosure_Form_Certificate_If_there_is_a_difference_between_this_summary_and_either_Evidence_of_Coverage_Disclosure_form_Certificate_the_Evidence_of_Coverage_Disclosure_form_Certificate_will_prevail:
  {
  In_network: String,
  Out_of_network: String
  },
  Frames:
  {
  In_network: String,
  Out_of_network: String
  },
  Elective_Contact_Lenses:
  {
  In_network: String,
  Out_of_network: String
  },
  Non_Elective_Contact_Lenses:
  {
  In_network: String,
  Out_of_network: String
  },
  Children_Vision_Essential_Health_Benefits:
  {
  In_network: String,
  Out_of_network: String
  },
  Covered_Dental_Benefits:
  {
  In_network: String,
  Out_of_network: String
  },
  Trifocal:
  {
  In_network: String,
  Out_of_network: String
  },
  Bifocal:
  {
  In_network: String,
  Out_of_network: String
  },
  Vision_exam:
  {
  In_network: String,
  Out_of_network: String
  },
  Adult_Vision:
  {
  Elective_contact_lenses:
  {
  In_network: String
  },
  Frames:
  {
  In_network: String
  },
  Lenses:
  {
  In_network: String
  },
  Vision_exam:
  {
  In_network: String
  }
  },
  Children_Dental_Essential_Health_Benefits:
  {
  Cosmetic_Orthodontia_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Deductible:
  {
  In_network: String,
  Out_of_network: String
  },
  Diagnostic_and_preventive:
  {
  In_network: String,
  Out_of_network: String
  },
  Major_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Medically_Necessary_Orthodontia_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Out_of_Pocket_Limit:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  },
  Covered_Dental_Benefits:
  {
  Children_Dental_Essential_Health_Benefits:
  {
  Deductible:
  {
  In_network: String,
  Out_of_network: String
  },
  Major_services:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Adult_Dental:
  {
  Annual_maximum:
  {
  In_network: String
  },
  Basic_services:
  {
  In_network: String
  },
  Deductible:
  {
  In_network: String
  },
  Diagnostic_and_preventive:
  {
  In_network: String
  },
  Major_services:
  {
  In_network: String
  }
  }
  },
  Your_plan_also_includes_the_following_Healthy_Support_features:
  {
  FitOrbit:
  {
  In_network: String,
  Out_of_network: String
  },
  Gym_membership_reimbursement:
  {
  In_network: String,
  Out_of_network: String
  },
  Healthy_Lifestyles_incentives:
  {
  In_network: String,
  Out_of_network: String
  },
  Quarterly_Health_Webinars:
  {
  In_network: String
  },
  Tobacco_free_certification_with_incentives:
  {
  In_network: String
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

exports.CopyCheckAnthem = function (array, collection_name)
{
 var ConnectString = help_scripts.ConnectStr();
 var i, j;
 var Anthem_source = mongoose.model('Anthem', schema);
 var Anthem_copy = mongoose.model(collection_name, SchemaNormal);
 try
 {
  mongoose.connect(ConnectString);
 } catch (err)
 {
  return (err);
 };
 for (i = 0; i < array.length; i++)
 {
  Anthem_source.find({ Path: array[i] }, function (err, doc)
  {
   var check_array = [];
   var data_array = [];
   var m;
   var CurPlanType = '';
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Plan;
   data_array[0] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Network;
   data_array[1] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Overall_Deductible.In_network.Member;
   data_array[2] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Overall_Deductible.In_network.Family;
   data_array[3] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Member;
   data_array[4] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Family;
   data_array[5] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Member;
   data_array[6] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Family;
   data_array[7] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Member;
   data_array[8] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Family;
   data_array[9] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.In_network;
   data_array[10] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.Out_of_network;
   data_array[11] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.In_network;
   data_array[12] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.Out_of_network;
   data_array[13] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.In_network;
   data_array[14] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.Out_of_network;
   data_array[15] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.In_network;
   data_array[16] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.Out_of_network;
   data_array[17] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.In_network;
   data_array[18] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.Out_of_network;
   data_array[19] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.In_network;
   data_array[20] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.Out_of_network;
   data_array[21] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.In_network;
   data_array[22] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.Out_of_network;
   data_array[23] = help_scripts.GetCorrField(check_array);
   if (data_array[0].indexOf('HMO') >= 0) CurPlanType = 'HMO';
   else CurPlanType = 'PPO';
   var NewAnthem = new Anthem_copy({
    FilePath: doc[0].Path,
    PlanName: data_array[0],
    PlanType: CurPlanType,
    Network: data_array[1],

    Deductible:
    {
     InNetwork:
     {
      Member: data_array[2],
      Family: data_array[3]
     },
     OutOfNetwork:
     {
      Member: data_array[4],
      Family: data_array[5]
     }
    },
    OOPLimit:
    {
     InNetwork:
     {
      Member: data_array[6],
      Family: data_array[7]
     },
     OutOfNetwork:
     {
      Member: data_array[8],
      Family: data_array[9]
     }
    },

    PCPVisit:
    {
     InNetwork: data_array[10],
     OutOfNetwork: data_array[11]
    },
    SpecialistVisit:
    {
     InNetwork: data_array[12],
     OutOfNetwork: data_array[13]
    },


    UrgentCare:
    {
     InNetwork: data_array[14],
     OutOfNetwork: data_array[15]
    },


    RxTier1:
    {
     InNetwork: data_array[16],
     OutOfNetwork: data_array[17]
    },
    RxTier2:
    {
     InNetwork: data_array[18],
     OutOfNetwork: data_array[19]
    },
    RxTier3:
    {
     InNetwork: data_array[20],
     OutOfNetwork: data_array[21]
    },
    RxTier4:
    {
     InNetwork: data_array[22],
     OutOfNetwork: data_array[23]
    }

   });
   try
   {
    NewAnthem.save(function (err, thor)
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
 return ('Copying of "Anthem" in a collection "' + collection_name + '" took place successfully');
}

exports.SetCheckAnthem = function (res)
{
 var ConnectString = help_scripts.ConnectStr();
 var docs = [];
 var paths = [];
 var result_str = '';
 var FindAnthem = mongoose.model('Anthem', schema);
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
  FindAnthem.distinct('Path', {}, function (err, paths)
  {
   if (err) return console.error(err);
   FindAnthem.find({}, function (err, docs)
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
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Overall_Deductible.In_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Overall_Deductible.In_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.Out_of_network;
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
    str = fs.readFileSync('./inputpages/Anthem_result.html', "utf-8") + result_str;
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

exports.SetAnthemNormal = function ()
{
 var AnthemCount = 0;
 var NewAnthemNormal;
 var ConnectString = help_scripts.ConnectStr();
 var docs = [];
 var FindAnthem = mongoose.model('Anthem', schema);
 var AnthemNormal = mongoose.model('AnthemNormal', SchemaNormal);
 try
 {
  mongoose.connect(ConnectString);
 } catch (err) {
  return (err);
 };
 var FindAnthemCount = 0;
 db.on("error", console.error.bind(console, "connection error:"));
 try
 {
  FindAnthem.count({}, function (err, count)
  {
   FindAnthemCount = count;
  });
 } catch (err) {
  mongoose.disconnect();
  return (err);
 };
 try
 {
  FindAnthem.find({}, function (err, docs)
  {

   var i = 0;
   var CurPlanType;
   while (i < FindAnthemCount)
   {
    if (docs[i].Plan.indexOf('HMO') >= 0) CurPlanType = 'HMO';
    else CurPlanType = 'PPO';
    NewAnthemNormal = new AnthemNormal({
     User: docs[i].User,
     Network : docs[i].Network,
     PlanName: docs[i].Plan,
     PlanType: CurPlanType,
     FilePath: docs[i].Path,
     Deductible:
     {
      InNetwork:
      {
       Member: docs[i].Covered_Medical_Benefits.Overall_Deductible.In_network.Member,
       Family: docs[i].Covered_Medical_Benefits.Overall_Deductible.In_network.Family
      },
      OutOfNetwork:
      {
       Member: docs[i].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Member,
       Family: docs[i].Covered_Medical_Benefits.Overall_Deductible.Out_of_network.Family
      }
     },
     OOPLimit:
     {
      InNetwork:
      {
       Member: docs[i].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Member,
       Family: docs[i].Covered_Medical_Benefits.Out_of_Pocket_Limit.In_network.Family
      },
      OutOfNetwork:
      {
       Member: docs[i].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Member,
       Family: docs[i].Covered_Medical_Benefits.Out_of_Pocket_Limit.Out_of_network.Family
      }
     },
     PCPVisit:
     {
      InNetwork: docs[i].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.In_network,
      OutOfNetwork: docs[i].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Primary_care_visit_to_treat_an_injury_or_illness.Out_of_network
     },
     SpecialistVisit:
     {
      InNetwork: docs[i].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.In_network,
      OutOfNetwork: docs[i].Covered_Medical_Benefits.Doctor_Home_and_Office_Services.Specialist_care_visit.Out_of_network
     },
     RxTier1:
     {
      InNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.In_network,
      OutOfNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_1.Out_of_network
     },
     RxTier2:
     {
      InNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.In_network,
      OutOfNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_2.Out_of_network
     },
     RxTier3:
     {
      InNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.In_network,
      OutOfNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_3.Out_of_network
     },
     RxTier4:
     {
      InNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.In_network,
      OutOfNetwork: docs[i].Covered_Prescription_Drug_Benefits.Retail_Prescription_Drug_Coverage.Drug_tier_4.Out_of_network
     },
     UrgentCare:
     {
      InNetwork: docs[i].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.In_network,
      OutOfNetwork: docs[i].Covered_Medical_Benefits.Diagnostic_Services.Emergency_and_Urgent_Care.Urgent_care.Out_of_network
     }
    });
    NewAnthemNormal.save(function (err, thor)
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
 return('AnthemNormal - complet.');
};



exports.SaveAnthem = function (array)
{
 var ConnectString = help_scripts.ConnectStr();
 var Anthem = mongoose.model('Anthem', schema);
 var DelAnthem = mongoose.model('Anthem', schema);
 var NewAnthem = new Anthem({
  User: array[0],
  Path: array[1],
  Plan: array[2],
  Network: array[25],
  Covered_Medical_Benefits:
  {
   Overall_Deductible:
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
   Out_of_Pocket_Limit:
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
   Doctor_Home_and_Office_Services:
   {
    /* Acupuncture:
     {
     In_network: array[11],
     Out_of_network: array[12]
     },
     Chemo_radiation_therapy:
     {
     In_network: array[13],
     Out_of_network: array[14]
     },
     Chiropractor_services:
     {
     In_network: array[15],
     Out_of_network: array[16]
     },
     Hemodialysis:
     {
     In_network: array[17],
     Out_of_network: array[18]
     },
     On_line_visit:
     {
     In_network: array[19],
     Out_of_network: array[20]
     },
     Post_natal_care:
     {
     In_network: array[21],
     Out_of_network: array[22]
     },
     Prenatal_and_post_natal_visit:
     {
     In_network: array[23],
     Out_of_network: array[24]
     },
     Prenatal_care:
     {
     In_network: array[25],
     Out_of_network: array[26]
     },
     Prescription_drugs:
     {
     In_network: array[27],
     Out_of_network: array[28]
     },
     Preventive_care:
     {
     In_network: array[29],
     Out_of_network: array[30]
     },*/
    Primary_care_visit_to_treat_an_injury_or_illness:
    {
     In_network: array[11],
     Out_of_network: array[12]
    },
    Specialist_care_visit:
    {
     In_network: array[13],
     Out_of_network: array[14]
    }/* ,
    Other_practitioner_visits:
    {
    Acupuncture:
    {
    In_network: array[35],
    Out_of_network: array[36]
    },
    Chiropractor_services:
    {
    In_network: array[37],
    Out_of_network: array[38]
    },
    Retail_health_clinic:
    {
    In_network: array[39],
    Out_of_network: array[40]
    },
    Allergy_testing:
    {
    In_network: array[41],
    Out_of_network: array[42]
    },
    Chemo_radiation_therapy:
    {
    In_network: array[43],
    Out_of_network: array[44]
    }
    },
    Other_services_in_an_office:
    {
    Hemodialysis:
    {
    In_network: array[45],
    Out_of_network: array[46]
    },
    Prescription_drugs:
    {
    In_network: array[47],
    Out_of_network: array[48]
    }
    } */
   },
   Diagnostic_Services:
   {
    /* Lab:
     {
     Outpatient_hospital:
     {
     In_network: array[49],
     Out_of_network: array[50]
     },
     Office:
     {
     In_network: array[51],
     Out_of_network: array[52]
     }
     },
     X_ray:
     {
     Outpatient_hospital:
     {
     In_network: array[53],
     Out_of_network: array[54]
     }
     },
     Advanced_diagnostic_imaging:
     {
     Office:
     {
     In_network: array[55],
     Out_of_network: array[56]
     },
     Outpatient_hospital:
     {
     In_network: array[57],
     Out_of_network: array[58]
     }
     },*/
    Emergency_and_Urgent_Care:
    {
     /*  Emergency_room_facility_services:
      {
      In_network: array[59],
      Out_of_network: array[60]
      },
      Emergency_room_doctor_and_other_services:
      {
      In_network: array[61],
      Out_of_network: array[62]
      },
      Ambulance:
      {
      In_network: array[63],
      Out_of_network: array[64]
      },*/
     Urgent_care:
     {
      In_network: array[15],
      Out_of_network: array[16]
     }/*,
     Doctor_services:
     {
     In_network: array[67],
     Out_of_network: array[68]
     } */
    }
   }/* ,
   Outpatient_Mental_Behavioral_Health_and_Substance_Abuse:
   {
   Doctor_office_visit:
   {
   In_network: array[69],
   Out_of_network: array[70]
   },
   Doctor_services:
   {
   In_network: array[71],
   Out_of_network: array[72]
   },
   Facility_visit:
   {
   Facility_fees:
   {
   In_network: array[73],
   Out_of_network: array[74]
   }
   }
   },
   Outpatient_Surgery:
   {
   Doctor_and_other_services:
   {
   In_network: array[75],
   Out_of_network: array[76]
   },
   Hospital:
   {
   In_network: array[77],
   Out_of_network: array[78]
   },
   Facility_fee:
   {
   Freestanding_surgical_center:
   {
   In_network: array[79],
   Out_of_network: array[80]
   },
   Hospital:
   {
   In_network: array[81],
   Out_of_network: array[82]
   }
   }
   },
   Hospital_Stay:
   {
   Doctor_and_other_services:
   {
   In_network: array[83],
   Out_of_network: array[84]
   },
   Visit_our_Website_to_learn_which_in_network_facilities_are_consideredTier_1_and_therefore_may_result_in_lower_cost_sharing_for_you:
   {
   In_network: array[85],
   Out_of_network: array[86]
   }
   },
   Recovery_and_Rehabilitation:
   {
   Cardiac_rehabilitation:
   {
   In_network: array[87],
   Out_of_network: array[88]
   },
   Durable_medical_equipment_and_prosthetics:
   {
   In_network: array[89],
   Out_of_network: array[90]
   },
   Durable_medical_equipment:
   {
   In_network: array[91],
   Out_of_network: array[92]
   },
   Home_health_care:
   {
   In_network: array[93],
   Out_of_network: array[94]
   },
   Limited_to_100_days_per_year:
   {
   In_network: array[95],
   Out_of_network: array[96]
   },
   Orthotics_prosthetics_and_special_footwear:
   {
   In_network: array[97],
   Out_of_network: array[98]
   },
   Rehabilitation_services:
   {
   In_network: array[99],
   Out_of_network: array[100]
   },
   Skilled_nursing_care:
   {
   In_network: array[101],
   Out_of_network: array[102]
   },
   Visit_our_Website_to_learn_which_in_network_facilities_are_considered_Tier_1_and_therefore:
   {
   In_network: array[103],
   Out_of_network: array[104]
   },
   may_result_in_lower_cost_sharing_for_you_Limited_to_100_days_per_year:
   {
   In_network: array[105],
   Out_of_network: array[106]
   },
   Rehabilitation_services:
   {
   Office:
   {
   In_network: array[107],
   Out_of_network: array[108]
   }
   }
   }*/
  },
  Covered_Prescription_Drug_Benefits:
  {
   Retail_Prescription_Drug_Coverage:
   {
    /* Drug_tier_4_per_prescription_maximum_cost_share:
     {
     In_network: array[109],
     Out_of_network: array[110]
     },
     Deductible:
     {
     In_network:
     {
     Member: array[111],
     Family: array[112]
     },
     Out_of_network:
     {
     Member: array[113],
     Family: array[114]
     }
     },*/
    Drug_tier_1:
    {
     In_network: array[17],
     Out_of_network: array[18]
    },
    Drug_tier_2:
    {
     In_network: array[19],
     Out_of_network: array[20]
    },
    Drug_tier_3:
    {
     In_network: array[21],
     Out_of_network: array[22]
    },
    Drug_tier_4:
    {
     In_network: array[23],
     Out_of_network: array[24]
    }/*,
    Elective_contact_lenses:
    {
    In_network: array[123]
    },
    Frames:
    {
    In_network: array[124]
    },
    Lenses:
    {
    In_network: array[125]
    }
    },
    Children_Dental_Essential_Health_Benefits:
    {
    Basic_services:
    {
    In_network: array[126]
    } */
   }
  }/*,
   Covered_Vision_Benefits:
   {
   This_is_a_brief_outline_of_your_vision_coverage_Not_all_cost_shares_for_covered_services_are_shown_below_For_a_full_list_including_benefits_exclusions_and_limitations_see_the_combined_Evidence_of_Coverage_Disclosure_Form_Certificate_If_there_is_a_difference_between_this_summary_and_either_Evidence_of_Coverage_Disclosure_form_Certificate_the_Evidence_of_Coverage_Disclosure_form_Certificate_will_prevail:
   {
   In_network: array[127],
   Out_of_network: array[128]
   },
   Frames:
   {
   In_network: array[129],
   Out_of_network: array[130]
   },
   Elective_Contact_Lenses:
   {
   In_network: array[131],
   Out_of_network: array[132]
   },
   Non_Elective_Contact_Lenses:
   {
   In_network: array[133],
   Out_of_network: array[134]
   },
   Children_Vision_Essential_Health_Benefits:
   {
   In_network: array[135],
   Out_of_network: array[136]
   },
   Covered_Dental_Benefits:
   {
   In_network: array[137],
   Out_of_network: array[138]
   },
   Trifocal:
   {
   In_network: array[139],
   Out_of_network: array[140]
   },
   Bifocal:
   {
   In_network: array[141],
   Out_of_network: array[142]
   },
   Vision_exam:
   {
   In_network: array[143],
   Out_of_network: array[144]
   },
   Adult_Vision:
   {
   Elective_contact_lenses:
   {
   In_network: array[145]
   },
   Frames:
   {
   In_network: array[146]
   },
   Lenses:
   {
   In_network: array[147]
   },
   Vision_exam:
   {
   In_network: array[148]
   }
   },
   Children_Dental_Essential_Health_Benefits:
   {
   Cosmetic_Orthodontia_services:
   {
   In_network: array[149],
   Out_of_network: array[150]
   },
   Deductible:
   {
   In_network: array[151],
   Out_of_network: array[152]
   },
   Diagnostic_and_preventive:
   {
   In_network: array[153],
   Out_of_network: array[154]
   },
   Major_services:
   {
   In_network: array[155],
   Out_of_network: array[156]
   },
   Medically_Necessary_Orthodontia_services:
   {
   In_network: array[157],
   Out_of_network: array[158]
   },
   Out_of_Pocket_Limit:
   {
   In_network: array[159],
   Out_of_network: array[160]
   }
   }
   },
   Covered_Dental_Benefits:
   {
   Children_Dental_Essential_Health_Benefits:
   {
   Deductible:
   {
   In_network: array[161],
   Out_of_network: array[162]
   },
   Major_services:
   {
   In_network: array[163],
   Out_of_network: array[164]
   }
   },
   Adult_Dental:
   {
   Annual_maximum:
   {
   In_network: array[165]
   },
   Basic_services:
   {
   In_network: array[166]
   },
   Deductible:
   {
   In_network: array[167]
   },
   Diagnostic_and_preventive:
   {
   In_network: array[168]
   },
   Major_services:
   {
   In_network: array[169]
   }
   }
   },
   Your_plan_also_includes_the_following_Healthy_Support_features:
   {
   FitOrbit:
   {
   In_network: array[170],
   Out_of_network: array[171]
   },
   Gym_membership_reimbursement:
   {
   In_network: array[172],
   Out_of_network: array[173]
   },
   Healthy_Lifestyles_incentives:
   {
   In_network: array[174],
   Out_of_network: array[175]
   },
   Quarterly_Health_Webinars:
   {
   In_network: array[176]
   },
   Tobacco_free_certification_with_incentives:
   {
   In_network: array[177]
   }
   }*/
 });
 try
 {
  mongoose.connect(ConnectString, function (err)
  {
   if (err) return console.error(err);
  });
 } catch (err) {
  return (err);
 };

 try
 {
  DelAnthem.findOneAndRemove({ User: array[0], Path: array[1] }, function (err, doc)
  {
   if (err) return console.error(err);
   NewAnthem.save(function (err, thor)
   {
    if (err) return console.error(err);
    mongoose.disconnect();
   });
  });

 } catch (err) {
  mongoose.disconnect();
  return (err);
 };

 return ('<caption style="font-weight:bold">'+array[0]+', thank you for completing plan "'+array[2]+'" </caption><caption style="font-weight:bold">Company - "Anthem"</caption><caption style="font-weight:bold">Path -' + array[1] + '</caption><caption style="font-weight:bold">Network - '+array[25]+'</caption>');
};
