var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts')
var db = mongoose.connection;

var Schema = mongoose.Schema;

var schema = new Schema({
 User: String,
 Path: String,
 Plan: String,
 Network: String,
 DEDUCTIBLE:
 {
  Calendar_Year_Medical_Deductible:
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
  Calendar_Year_Out_of_Pocket_Maximum:
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
  }
 },
 /*  LIFETIME_BENEFIT_MAXIMUM:
  {
  Covered_Services:
  {
  In_network: String,
  Out_of_network: String
  }
  },*/
 PROFESSIONAL_SERVICES:
 {
  Professional_Benefits:
  {
   Physician_office_visits:
   {
    In_network: String,
    Out_of_network: String
   },
   Specialist_office_visits:
   {
    In_network: String,
    Out_of_network: String
   }/*,
   CT_scans_MRIs_MRAs_PET_scans_and_cardiac_diagnostic_procedures_utilizing_nuclear_medicine:
   {
   In_network: String,
   Out_of_network: String
   },
   Outpatient_diagnostic_laboratory_and_pathology:
   {
   In_network: String,
   Out_of_network: String
   }*/
  }/*,
  Allergy_Testing_and_Treatment_Benefits:
  {
  Office_visits:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Preventive_Health_Benefits:
  {
  Preventive_health_services:
  {
  In_network: String,
  Out_of_network: String
  }
  }*/
 },
 /*  OUTPATIENT_SERVICES:
  {
  Hospital_Benefits:
  {
  Outpatient_surgery_performed_at_an_ambulatory_surgery_center:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_surgery_in_a_hospital:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_services_for_treatment_of_illness_or_injury_and_necessary_supplies:
  {
  In_network: String,
  Out_of_network: String
  },
  CT_scans_MRIs_MRAs_PET_scans_and_cardiac_diagnostic_procedures_utilizing_nuclear_medicine_performed_in_a_hospital:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_diagnostic_X_ray_and_imaging_performed_in_a_hospital:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_diagnostic_laboratory_and_pathology_performed_in_a_hospital:
  {
  In_network: String,
  Out_of_network: String
  },
  Bariatric_surgery:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  },
  HOSPITALIZATION_SERVICES:
  {
  Hospital_Benefits:
  {
  Inpatient_physician_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Inpatient_non_emergency_facility_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Bariatric_surgery:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Skilled_Nursing_Facility_Benefits:
  {
  Services_from_a_free_standing_skilled_nursing_facility:
  {
  In_network: String,
  Out_of_network: String
  },
  Skilled_nursing_unit_of_a_hospital:
  {
  In_network: String,
  Out_of_network: String
  }
  }
  },*/
 EMERGENCY_HEALTH_COVERAGE:
 {
  /*  Emergency_room_services_not_resulting_in_admission:
   {
   In_network: String,
   Out_of_network: String
   },
   Emergency_room_services_resulting_in_admission:
   {

   In_network: String,
   Out_of_network: String
   },
   Emergency_room_physician_services:
   {
   In_network: String,
   Out_of_network: String
   },*/
  Urgent_care:
  {
   In_network: String,
   Out_of_network: String
  }
 },/*
  AMBULANCE_SERVICES:
  {
  Emergency_or_authorized_transport:
  {
  In_network: String,
  Out_of_network: String
  }
  },*/
 PRESCRIPTION_DRUG_COVERAGE:
 {
  Retail_Prescriptions:
  {
   /* Contraceptive_drugs_and_devices:
    {
    In_network: String,
    Out_of_network: String
    },*/
   Generic_drugs:
   {
    In_network: String,
    Out_of_network: String
   },
   Preferred_brand_drugs:
   {
    In_network: String,
    Out_of_network: String
   },
   Non_preferred_brand_drugs:
   {
    In_network: String,
    Out_of_network: String
   }
  }/*,
  Mail_Service_Prescriptions:
  {
  Contraceptive_drugs_and_devices:
  {
  In_network: String,
  Out_of_network: String
  },
  Generic_drugs:
  {
  In_network: String,
  Out_of_network: String
  },
  Preferred_brand_drugs:
  {
  In_network: String,
  Out_of_network: String
  },
  Non_preferred_brand_drugs:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Specialty_Pharmacies:
  {
  Specialty_drugs:
  {
  In_network: String,
  Out_of_network: String
  }
  }*/
 }/*,
  PROSTHETICS_ORTHOTICS:
  {
  Prosthetic_equipment_and_devices:
  {
  In_network: String,
  Out_of_network: String
  },
  Orthotic_equipment_and_devices:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  DURABLE_MEDICAL_EQUIPMENT:
  {
  Breast_pump:
  {
  In_network: String,
  Out_of_network: String
  },
  Other_durable_medical_equipment:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  MENTAL_HEALTH_SERVICES:
  {
  Inpatient_hospital_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_mental_healt_services:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  CHEMICAL_DEPENDENCY_SERVICES:
  {
  Inpatient_hospital_services_for_medical_acute_detoxification:
  {
  In_network: String,
  Out_of_network: String
  },
  Outpatient_substance_abuse_services:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  HOME_HEALTH_SERVICES:
  {
  Home_health_care_agency_services:
  {
  In_network: String,
  Out_of_network: String
  },
  Home_infusion_home_intravenous_injectable_therapy_and_infusion_nursing_visits_provided_by_a_home_infusion_agency:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  OTHER:
  {
  Hospice_Program_Benefits:
  {
  Routine_home_care:
  {
  In_network: String,
  Out_of_network: String
  },
  Inpatient_respite_care:
  {
  In_network: String,
  Out_of_network: String
  },
  hour_24_continuous_home_care:
  {
  In_network: String,
  Out_of_network: String
  },
  Shor_term_inpatient_care_for_pain_and_symptom_management:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Chiropractic_Benefits:
  {
  Chiropractic_services:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Acupuncture_Benefits:
  {
  Acupuncture_by_a_licensed_acupuncturist:
  {
  In_network: String,
  Out_of_network: String
  },
  Acupuncture_by_doctors_of_medicine:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Rehabilitation_Benefits:
  {
  Office_location:
  {
  In_network: String,
  Out_of_network: String
  }
  },
  Pregnancy_and_Maternity_Care_Benefits:
  {
  Prenatal_and_preconception_physician_office_visit_initial_visit:
  {
  In_network: String,
  Out_of_network: String
  },
  Prenatal_and_preconception_physician_office_visit_subsequent_visits:
  {
  In_network: Strin�,
  Out_of_nmtwork: Stping
  }(	
  Post�atal_�hysicia^_officd_vicits:
$ {
  In_neuwor{: Strin�,
  Ou4_of_netwnrk:"S|ring
  |
  }(
  Damil�OTlqnni�g_BenefItr:*  {
  Counsel)ng_and_cmnsultkng:
  { `Mn_ne4sork: Stryng,
  O5t_of_netwoRk2 String
" },
  Elective_abortiOn>
  {
  In_networ�* Qtring,
  Out_gfnetwork: S4ri~g
 !},
  Tusal_ligation�
  {
  I._network: Svzine,� `Mut_f_ngt�ork: Stzing
  ,
  Vaqec|om}:
  {
0 Yn_netwobk: Strijg,
  Out_/fnetwkrk� StringJ0 }M
  },
 !DiabetesCare_Benevits8
  {
  Deryces_gquipment_a~d_non_tes~ing_supplies:  {-�  In[nupwork: S�rij�,J" Out_of_n�twork> String },
  Diab�ugs_senfWmanafeme~t_Tsaining:Bb {  An_netwr{: String,
  Out_on_netwos�: String
  }
  },-
 $Aare__utside_/fWPlan_Serv)cg_Arga:
  o
  Within_US_BlteCaRd_P2ogram:
  {
 `Yn_network: Strine,
  Ogt_of_n�twork: �tring
  },
 8OutsIdeOof_US_BlueCavd_Worldside:
  s  In_/etwrk: StRing,
  Ou|_o�_network: String
  }
  }
  },
$ Pediat�ic_vision_Benefits:
  {
  Comprehensive_Eyg�Eham:*  {
 `Ophwhalmologic:
  {* $Routine_ophthalmologic_Exam[with_refraction_new_patignt:M
  {
 �In_nepwork: �tring,
  O]t_of_network: Strin�
" },
  Routine_ophthaloologyc_Dxam_with__regractiOn_establisied_patiEnt:
  {-
  �n_network: String,
  Out_ov_natwovk:`String
  }
  },
  Opto}etric�
  {
0 New_pa�ient_%xams:
  {
  In_nexfo�k:`Strkne,
  Out_of_network: String
  },	
"(Establis`ed_p`tien�_excms:
  {
  In_netwoRk: String,
  Mut_of_network: trhn'
  }
 `}
  }-
  EyEgdasses:
  {  Lenses_on%_pamr_per_calendar_year:J  y
  Single_6isin:
  {E
0 Ij_network: Stsigg(
  Owt_ov_netwoRk: Striog
$ },
  Conrentionql_bifocal:  {
  In_network:Striog,
  Out_of_net_orK: String
  },
  ConvEntional_try&ocal:  {
  in_networo� StrIne,
  Out_�fne`work: trhng
0 },�  Lenticular:
  {
 (InWnetwork: String,  Oqt_of_network: Suring
  },
  Lences_include_choiceO/f_glass_`last�c_or_poli�arbonave_�enres_al$W�ejsOpowe2s:
  {$ In_network: String,
  _ut_of_network� String
( }�
  },
� p|ional_Henses_and_Tbeatments:  {M
  uV_c/ating:�  {
  io_nedwkrk:"Str�ng,M
 aOut_/F_netwovk: String
$$},
  Anvi[b�flec��ve_coating:
  {
  InOnetworo:"String,
  OuT_of_Network: Strijg
  },
  High_mnduxOlense3:
  {
  In_network: Strijg,
  Out_oF_neuwork: StriN'
  },
  Phovochromic_lenses_plastic:
  {
  If]netwkrk:0String(J  Outofnetwor+: Stri~gM
  },�` Photo�hromic_lgnses_gnars:
  {
  Ij_networK: string,
  Out_of_ng|worj: Stving
  ,	
  @onarized_ensEq:
  {
  In_network;"String,,
  Out_/f_netwovk8 Strkng
  },
  Suandard_progressive3;
  {
  IN_ngtuork: Strkng,
  O�t_Od_ne|wo2k: StRing
  }.
 "Premi�m_progressives*
  {�
  I._n%twork: String,
 �_ut_of_n%twork: Q�ring
00]
  })
  Frame:
  {
  Collectmon_nrames:
  {
  I~]network: S4ring,
  OUt_of_networi: String
  },
  Non_Collect)o�_fram%s2
  {M
  In_network: String,�*0 Out_of_networo� String
  }
  },
  Contact_Lenses:
  {
  Non_Electite]Hard_�r_soFt_One_piIr_per_C�lindar_YEer:  y
  IN_network:0Str�lg,*  Out_of_netwopk: String-
( y,
  ElectiveStqndard_�azd_Ond_pair_p�r_CelaNdar_Yeav:
$ {
  In_nutwork� Strinf,
  Out_kf_netsmrk2 String
  },
  Elective_Non_rtandard_hard_Onepaiz��er_Calandir_Xedr:
  �
  In^network:�Strinf(�  Out_of_network: Striog
 (},
  Electi~u_StAjdard_soft_One_pair_permooth_up_to_2_m�nvhs_per_Calen$ar_Year:
  {
  InOnetwork2 Str)ng,�
  Oqt�of_networ: String
  },
  Elective_Non_standardsof4_On%_`air_pEr�m�nth_5p_to_3mofths_pev_CaleodarWYear:
  {
  In_network: Strhng,�
  Out_o&_net7ork: String	
  }
  ,
  OtherWPediatric_Vision_Benefits:
  {
  Supplemental_low_ision_pestinn_and[equipmgnt:�
  {
  In_network: StrIng,M  Out_of]je�work* Strinf
  },
  Diabetes_management_2eberral:
 `{
  In_neuwork: StsynG,	
  O}t_of_network: String�
  }J  }
 "}
  } *?

});
)
vaV SchemaNormal =$new SchEoa({
 User     : String,� Network( : St�ing,
 �lanName ;!Ctring-
 XlanType !Strin�, FilePath : tring,
 Deductib`e:
 {
 $InNetwork:
 ${
   Member:"String,
0  Famil�: String
  },
  OutOfNetwrK:
  {
$  Member; STrin�,
   Famil�:0String
  }
 },
 OOLimit:
 {
  InLetwork:
  {   Member: String,
   Family: Ctring
  },
  OwtO�Fetwobk:
 "{
   MembeR: StriNg,J   �ami��: String
h ]
"y,
 QCPVisit>
 {
  InNetwork: Svring,
` OutOfN%twnrk: Ctriof
 u,
 Specialist^isit
 x-
  InNetworkz!Spring,
  O5tofNgtwopk: Strhng
 },
0ZxTier1: {
  I.Netwo2k: Suring,	
  OutObNetwork: Stping
 },
"RxTimr2:
 {
  InNmtsovk: String,
  OutOfNetw�rk: Spring
 },
 RxTier3:
 {
  InNgtwOrk: St�ing,
  OutfJ%tworo: S|rin�
 },
0RxTier4:
 {
  KnNetwork: String-
  OudOfN-twork: String
 },
 Urgen|Care:J {
 (InNduwork* StrIng,
  OutOgNutwrk: Stping	 }
});
*eXp/rts.Co�yCheck@lUgShaeld < �unction (qzray, collection_na-e)
{
 tar ConjebtString = hmlp�scrhrts.ConnectStr()3
 var m, j;
 var Blue[�ield_soqrca = mongoore.mod�d('lueShield', sche�a)
 var JlueShie,d_copy 5 mongoose.model(sollecti/n_lame, SchemaN�rmal);
 tsy {
  mongoo�e.connect(COnnectStrijg);
$}(catch (msr)
!{
� return (err);
!};
 For (i = 0; i < array.mength�`i++)-
 {
  Blu�Shield_surce&find({ Path: array[m\�}, gunction (err, doc)
  {
   var che#+_array = [];
   var dava_array = [Y;
  "waz m;
 0 var$C�rTlanT}pe = &/;
   checkarray.leng4j = 0;
   For (- = 0; m < doc.lungth; m++) c`eck_arriy[}] = dok[m].Plen+
   data_arr!y[0] = help_scr)�ts&GeqCorsFjeld(check_cbray):
"  caeco_ar2ay/lengtj0=(0;
   for (m  0?(m < doc.lengvh; o++)$checo_array[m] = eoc[m].Netwobk;
 � dada_array[1] 5 helq]scripts.etGorrFmeld(chMck_arRay);
   chesk_crray.leng4h =(�;   for (i = �; m < doc.lEngth; M+/) kheck_array[m]$= dog[m].DEDUCTIBLE.Calu�larOYgar_Medical_Deductible.In_netwovkMemb�R;
   datq_arbayY2] = help_wkriptr.GepCorrField(cjeck_qrray)?
 ��chmbk_a�ray.mdn�th = 0; $ fr"(m = 0; e <�doc.length; m++) chacj]er2ay[m] = doc[}U.DEDUCT	BLE.Calendar_Yaar�Med�cal_De`ubtible.AnOnEtwork&Vamily;
   data_array[3] = help_scpipts�GetCo"rViell*check_arpay);
   k�eck_arraY.le�wth = 0;
   for`(m = 0; m < doc.lungth; m++) check`rrai[mY`� dc[m].DEFUCTHBLECalendir_Year_MelkgalWDeduct�cle.OuT�of_neTwo0kMembmr;
  0fata_!rray[4](= help_scripts>Ge|GorsNield(check_irray);
   check_!rray.Length = 0+
   for (m ?"0; m < dc.length? m++) check_array[M] = `oc[m].DEDUCTIBLE.Canen$as_Year_Medibal_Deductible.Kut[of_nutworo.Family;J   daea_er3ay[5]"= helpOsczi0ts.GdtCorField(check_array);
   khesk_Ar2ay.l�ngth = 0;
   for (m ?"p; m < do#.lenguh; m++) chekk_array[m] = dkc[mMnDEDECDIBLD.Salendar_YearOut_of]Pogket_Maximum.In_network.Member;
   dAva_array6]"= he|p_skripts.GeeCorrField(cxe#k_arrAy);
 $`#heck_array.xength 9 0;   for 8m =�0;(m > `oc.lengtl; m++) Check_array[m] = eoc[�].LEDUCTIBLE.Calendaz_Ygar_Out[mb_Po�Ket_Maximum.Ij_network.Faoi,y;
&  data[asrayY�_*= help_scrixtw.OetCorrFaell(check_array);
   check_arzhy.mejgth = 0;
   for (m�= 23 } < doc.�ength; m++) cxuck_arsay[m]0=(dok[m].DEDUCTIBLECalendar_ear_Out_of_Pocket_Mcximum&Out_of_ne4wGrk.M�mber;
   eata_arvay[8] = help_scripts.OetCorrFielDcheck_array);
0  kheck_svray.length - 0;
 ��fgr (m = 0; m < doc.lej'th9 m+�) check_qrray[m] =�lob[m].DEDUCTIBLE.CcmendazYea�_Ou|_of_Pocket_Maximum.Oup_of_network.Familx;
   dati_arr!y[9] = help_scripts.GetCoprFiald(check_arraya;
  ��heckarr!y.length = 0�   for`(m ="p:"m , doc.len'th;!m++)"c�mck_array[-] �"Dc[o}.@ROFESS	ONAL_SERVICES.Professional_JenefItC,Phyqician_odfice_vi{itsnIN_nmtwork;
   data_array[1p] = hedp_scRipts.GetCorrFigld,che#�[arrax);
   chebK�array*lengtH"= 0;
`  fgr$(m = 0; m < dnc.langth; m++ checc_array[m] = doc[m]*ROFERSIONA�_SERVIES.Xr�fessi�nal_Benefits.X(}sician_ov�ice_visits.Out_of[letuork;
   data_aRray[10] = help_scripts.GepCorrField(check_array)3
   ghebk_asray.langth = 0;
   for (m0= 0; m < doc.lunguh; m++) checc_ar:ay[m] =0doc[m].@ROFESS�ONAL_SEPVICE{.PrOfe3sioLal_Benebits.Specialist_office_v)si|s.I�_Netw�rk;	
   da|a_arra}[12Y(= help_scripts.GetCgrrGield(check_a�ray);
   kheck_array.length- 0;
   fob (m =(0+ m < doc.lEnfth;"m+?(`check_�rray[m] =0dobRm].PROFESRIOFAL_CERVICES.Prove3sional_Cenefits.WpecialistWffice_vISits.Out_of_network;M
   dCta_arzay[1�] = helpscrIpts.GetCkrvField(bheck_array);
   check_array.le~gth = 1;
   fop (m = 0; m < doc.leneth; m++) check_array[e] = $oc[-].EMERGENCY_HEA\T_cOVERAGEnUrgent_Care.Mn_~etwoR+;
   data_array[14] = hedp_scvipvs.GetCorrFiel`(check_array);
  (cxeck_array.lefgdj = 0;
   for *m = 0; m | doc.leogv`; m++	 check_array[m� = eos[m]*EMERGENCY_H�ALTH_COVERAGE.]rgent]carE.Mut_of_nEtwork;	
0  data_Irrey{1%� = (e|p_scripts>GetCPrFialdhcheck_arva�);
   check_avray.length = 0;
  �for (m = 0; m | doc.l%ngti; m)k) chgcz_arsay[m] = dgc[m].VRESCRMPVIKN_DPUGWCOVER@GE.Retail_Prescrkptioos.Generic_dru's.In_n�twork;
   data_array[16] = help_scripus.dtCmrrFxend(checK_arrqy);
   chuck_arrqy.len�tj = 0;
   for �m = 0; m < do+.length; m++) chuck_array[m]!=$doc[m].PREsCRIPTION_dRUG�COVEBAGE.Retai|Prescriptions.Ge~eRic_dregs._ut_of_networj;
   data_arRay[17] } help^scrmpts.GetC~rrField�check_array);*   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.In_network;
   data_array[18] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.Out_of_network;
   data_array[19] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.In_network;
   data_array[20] = help_scripts.GetCorrField(check_array);
   check_array.length = 0;
   for (m = 0; m < doc.length; m++) check_array[m] = doc[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.Out_of_network;
   data_array[21] = help_scripts.GetCorrField(check_array);
   if (data_array[0].indexOf('HMO') >= 0) CurPlanType = 'HMO';
   else CurPlanType = 'PPO';
   var NewBlueShield = new BlueShield_copy({
    FilePath: doc[0].Path,
    PlanType: CurPlanType,
    PlanName: data_array[0],
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
     InNetwork: data_array[20],
     OutOfNetwork: data_array[21]
    }

   });
   try
   {
    NewBlueShield.save(function (err, thor)
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
 return ('Copying of "BlueShield" in a collection "' + collection_name + '" took place successfully');
}

exports.SetCheckBlueShield = function (res)
{
 var ConnectString = help_scripts.ConnectStr();
 var docs = [];
 var paths = [];
 var result_str = '';
 var FindBlueShield = mongoose.model('BlueShield', schema);
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
  FindBlueShield.distinct('Path', {}, function (err, paths)
  {
   if (err) return console.error(err);
   FindBlueShield.find({}, function (err, docs)
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
     if (paths[j].trim() == cur_patn)
     {
      j++;
      continue;
     }
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
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Medical_Deductible.In_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Medical_Deductible.In_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Medical_Deductible.Out_of_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Medical_Deductible.Out_of_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.In_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.In_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.Out_of_network.Member;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.Out_of_network.Family;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Professional_Benefits.Physician_office_visits.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Professional_Benefits.Physician_office_visits.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Professional_Benefits.Specialist_office_visits.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PROFESSIONAL_SERVICES.Professional_Benefits.Specialist_office_visits.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].EMERGENCY_HEALTH_COVERAGE.Urgent_care.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].EMERGENCY_HEALTH_COVERAGE.Urgent_care.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Generic_drugs.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Generic_drugs.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.Out_of_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.In_network;
     if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
     check_array.length = 0;
     for (m = 0; m < i; m++) check_array[m] = cur_docs[m].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.Out_of_network;
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
    str = fs.readFileSync('./inputpages/BlueShield_result.html', "utf-8") + result_str;
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

exports.SetBlueShieldNormal = function ()
{
 var BlueShieldCount = 0;
 var NewBlueShieldNormal;
 var ConnectString = help_scripts.ConnectStr();
 var docs = [];
 var FindBlueShield = mongoose.model('BlueShield', schema);
 var BlueShieldNormal = mongoose.model('BlueShieldNormal', SchemaNormal);
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
  FindBlueShield.count({}, function (err, count)
  {
   FindBlueShieldCount = count;
  });
 } catch (err) {
  mongoose.disconnect();
  return (err);
 };
 try
 {
  FindBlueShield.find({}, function (err, docs)
  {

   var i = 0;
   var CurPlanType;
   while (i < FindBlueShieldCount)
   {
    if (docs[i].Plan.indexOf('HMO') >= 0) CurPlanType = 'HMO';
    else CurPlanType = 'PPO';
    NewBlueShieldNormal = new BlueShieldNormal({
     User: docs[i].User,
     Network : docs[i].Network,
     PlanName: docs[i].Plan,
     PlanType: CurPlanType,
     FilePath: docs[i].Path,
     Deductible:
     {
      InNetwork:
      {
       Member: docs[i].DEDUCTIBLE.Calendar_Year_Medical_Deductible.In_network.Member,
       Family: docs[i].DEDUCTIBLE.Calendar_Year_Medical_Deductible.In_network.Family
      },
      OutOfNetwork:
      {
       Member: docs[i].DEDUCTIBLE.Calendar_Year_Medical_Deductible.Out_of_network.Member,
       Family: docs[i].DEDUCTIBLE.Calendar_Year_Medical_Deductible.Out_of_network.Family
      }
     },
     OOPLimit:
     {
      InNetwork:
      {
       Member: docs[i].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.In_network.Member,
       Family: docs[i].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.In_network.Family
      },
      OutOfNetwork:
      {
       Member: docs[i].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.Out_of_network.Member,
       Family: docs[i].DEDUCTIBLE.Calendar_Year_Out_of_Pocket_Maximum.Out_of_network.Family
      }
     },
     PCPVisit:
     {
      InNetwork: docs[i].PROFESSIONAL_SERVICES.Professional_Benefits.Physician_office_visits.In_network,
      OutOfNetwork: docs[i].PROFESSIONAL_SERVICES.Professional_Benefits.Physician_office_visits.Out_of_network
     },
     SpecialistVisit:
     {
      InNetwork: docs[i].PROFESSIONAL_SERVICES.Professional_Benefits.Specialist_office_visits.In_network,
      OutOfNetwork: docs[i].PROFESSIONAL_SERVICES.Professional_Benefits.Specialist_office_visits.Out_of_network
     },
     RxTier1:
     {
      InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Generic_drugs.In_network,
      OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Generic_drugs.Out_of_network
     },
     RxTier2:
     {
      InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.In_network,
      OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Preferred_brand_drugs.Out_of_network
     },
     RxTier3:
     {
      InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.In_network,
      OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.Out_of_network
     },
     RxTier4:
     {
      InNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.In_network,
      OutOfNetwork: docs[i].PRESCRIPTION_DRUG_COVERAGE.Retail_Prescriptions.Non_preferred_brand_drugs.Out_of_network
     },
     UrgentCare:
     {
      InNetwork: docs[i].EMERGENCY_HEALTH_COVERAGE.Urgent_care.In_network,
      OutOfNetwork: docs[i].EMERGENCY_HEALTH_COVERAGE.Urgent_care.Out_of_network
     }
    });
    NewBlueShieldNormal.save(function (err, thor)
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
 mongoose.disconnect();
 return('BlueShieldNormal - complet.');
};


exports.SaveBlueShield = function (array)
{
 var ConnectString = help_scripts.ConnectStr();
 var BlueShield = mongoose.model('BlueShield', schema);
 var DelBlueShield = mongoose.model('BlueShield', schema);
 var NewBlueShield = new BlueShield({
  User: array[0],
  Path: array[1],
  Plan: array[2],
  Network: array[23],
  DEDUCTIBLE:
  {
   Calendar_Year_Medical_Deductible:
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
   Calendar_Year_Out_of_Pocket_Maximum:
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
   }
  },
  /* LIFETIME_BENEFIT_MAXIMUM:
   {
   Covered_Services:
   {
   In_network: array[11],
   Out_of_network: array[12]
   }
   },*/
  PROFESSIONAL_SERVICES:
  {
   Professional_Benefits:
   {
    Physician_office_visits:
    {
     In_network: array[11],
     Out_of_network: array[12]
    },
    Specialist_office_visits:
    {
     In_network: array[13],
     Out_of_network: array[14]
    }/*,
    CT_scans_MRIs_MRAs_PET_scans_and_cardiac_diagnostic_procedures_utilizing_nuclear_medicine:
    {
    In_network: array[17],
    Out_of_network: array[18]
    },
    Outpatient_diagnostic_laboratory_and_pathology:
    {
    In_network: array[19],
    Out_of_network: array[20]
    }*/
   }/*,
   Allergy_Testing_and_Treatment_Benefits:
   {
   Office_visits:
   {
   In_network: array[21],
   Out_of_network: array[22]
   }
   },
   Preventive_Health_Benefits:
   {
   Preventive_health_services:
   {
   In_network: array[23],
   Out_of_network: array[24]
   }
   }*/
  },
  /*  OUTPATIENT_SERVICES:
   {
   Hospital_Benefits:
   {
   Outpatient_surgery_performed_at_an_ambulatory_surgery_center:
   {
   In_network: array[25],
   Out_of_network: array[26]
   },
   Outpatient_surgery_in_a_hospital:
   {
   In_network: array[27],
   Out_of_network: array[28]
   },
   Outpatient_services_for_treatment_of_illness_or_injury_and_necessary_supplies:
   {
   In_network: array[29],
   Out_of_network: array[30]
   },
   CT_scans_MRIs_MRAs_PET_scans_and_cardiac_diagnostic_procedures_utilizing_nuclear_medicine_performed_in_a_hospital:
   {
   In_network: array[31],
   Out_of_network: array[32]
   },
   Outpatient_diagnostic_X_ray_and_imaging_performed_in_a_hospital:
   {
   In_network: array[33],
   Out_of_network: array[34]
   },
   Outpatient_diagnostic_laboratory_and_pathology_performed_in_a_hospital:
   {
   In_network: array[35],
   Out_of_network: array[36]
   },
   Bariatric_surgery:
   {
   In_network: array[37],
   Out_of_network: array[38]
   }
   }
   },
   HOSPITALIZATION_SERVICES:
   {
   Hospital_Benefits:
   {
   Inpatient_physician_services:
   {
   In_network: array[39],
   Out_of_network: array[40]
   },
   Inpatient_non_emergency_facility_services:
   {
   In_network: array[41],
   Out_of_network: array[42]
   },
   Bariatric_surgery:
   {
   In_network: array[43],
   Out_of_network: array[44]
   }
   },
   Skilled_Nursing_Facility_Benefits:
   {
   Services_from_a_free_standing_skilled_nursing_facility:
   {
   In_network: array[45],
   Out_of_network: array[46]
   },
   Skilled_nursing_unit_of_a_hospital:
   {
   In_network: array[47],
   Out_of_network: array[48]
   }
   }
   },*/
  EMERGENCY_HEALTH_COVERAGE:
  {
   /*   Emergency_room_services_not_resulting_in_admission:
    {
    In_network: array[49],
    Out_of_network: array[50]
    },
    Emergency_room_services_resulting_in_admission:
    {

    In_network: array[51],
    Out_of_network: array[52]
    },
    Emergency_room_physician_services:
    {
    In_network: array[53],
    Out_of_network: array[54]
    },*/
   Urgent_care:
   {
    In_network: array[15],
    Out_of_network: array[16]
   }
  },/*
   AMBULANCE_SERVICES:
   {
   Emergency_or_authorized_transport:
   {
   In_network: array[57],
   Out_of_network: array[58]
   }
   },*/
  PRESCRIPTION_DRUG_COVERAGE:
  {
   Retail_Prescriptions:
   {
    /* Contraceptive_drugs_and_devices:
     {
     In_network: array[59],
     Out_of_network: array[60]
     },*/
    Generic_drugs:
    {
     In_network: array[17],
     Out_of_network: array[18]
    },
    Preferred_brand_drugs:
    {
     In_network: array[19],
     Out_of_network: array[20]
    },
    Non_preferred_brand_drugs:
    {
     In_network: array[21],
     Out_of_network: array[22]
    }
   }/*,
   Mail_Service_Prescriptions:
   {
   Contraceptive_drugs_and_devices:
   {
   In_network: array[67],
   Out_of_network: array[68]
   },
   Generic_drugs:
   {
   In_network: array[69],
   Out_of_network: array[70]
   },
   Preferred_brand_drugs:
   {
   In_network: array[71],
   Out_of_network: array[72]
   },
   Non_preferred_brand_drugs:
   {
   In_network: array[73],
   Out_of_network: array[74]
   }
   },
   Specialty_Pharmacies:
   {
   Specialty_drugs:
   {
   In_network: array[75],
   Out_of_network: array[76]
   }
   } */
  }/*,
   PROSTHETICS_ORTHOTICS:
   {
   Prosthetic_equipment_and_devices:
   {
   In_network: array[77],
   Out_of_network: array[78]
   },
   Orthotic_equipment_and_devices:
   {
   In_network: array[79],
   Out_of_network: array[80]
   }
   },
   DURABLE_MEDICAL_EQUIPMENT:
   {
   Breast_pump:
   {
   In_network: array[81],
   Out_of_network: array[82]
   },
   Other_durable_medical_equipment:
   {
   In_network: array[83],
   Out_of_network: array[84]
   }
   },
   MENTAL_HEALTH_SERVICES:
   {
   Inpatient_hospital_services:
   {
   In_network: array[85],
   Out_of_network: array[86]
   },
   Outpatient_mental_healt_services:
   {
   In_network: array[87],
   Out_of_network: array[88]
   }
   },
   CHEMICAL_DEPENDENCY_SERVICES:
   {
   Inpatient_hospital_services_for_medical_acute_detoxification:
   {
   In_network: array[89],
   Out_of_network: array[90]
   },
   Outpatient_substance_abuse_services:
   {
   In_network: array[91],
   Out_of_network: array[92]
   }
   },
   HOME_HEALTH_SERVICES:
   {
   Home_health_care_agency_services:
   {
   In_network: array[93],
   Out_of_network: array[94]
   },
   Home_infusion_home_intravenous_injectable_therapy_and_infusion_nursing_visits_provided_by_a_home_infusion_agency:
   {
   In_network: array[95],
   Out_of_network: array[96]
   }
   },
   OTHER:
   {
   Hospice_Program_Benefits:
   {
   Routine_home_care:
   {
   In_network: array[97],
   Out_of_network: array[98]
   },
   Inpatient_respite_care:
   {
   In_network: array[99],
   Out_of_network: array[100]
   },
   hour_24_continuous_home_care:
   {
   In_network: array[101],
   Out_of_network: array[102]
   },
   Shor_term_inpatient_care_for_pain_and_symptom_management:
   {
   In_network: array[103],
   Out_of_network: array[104]
   }
   },
   Chiropractic_Benefits:
   {
   Chiropractic_services:
   {
   In_network: array[105],
   Out_of_network: array[106]
   }
   },
   Acupuncture_Benefits:
   {
   Acupuncture_by_a_licensed_acupuncturist:
   {
   In_network: array[107],
   Out_of_network: array[108]
   },
   Acupuncture_by_doctors_of_medicine:
   {
   In_network: array[109],
   Out_of_network: array[110]
   }
   },
   Rehabilitation_Benefits:
   {
   Office_location:
   {
   In_network: array[111],
   Out_of_network: array[112]
   }
   },
   Pregnancy_and_Maternity_Care_Benefits:
   {
   Prenatal_and_preconception_physician_office_visit_initial_visit:
   {
   In_network: array[113],
   Out_of_network: array[114]
   },
   Prenatal_and_preconception_physician_office_visit_subsequent_visits:
   {
   In_network: array[115],
   Out_of_network: array[116]
   },
   Postnatal_physician_office_visits:
   {
   In_network: array[117],
   Out_of_network: array[118]
   }
   },
   Family_Planning_Benefits:
   {
   Counseling_and_consulting:
   {
   In_network: array[119],
   Out_of_network: array[120]
   },
   Elective_abortion:
   {
   In_network: array[121],
   Out_of_network: array[122]
   },
   Tubal_ligation:
   {
   In_network: array[123],
   Out_of_network: array[124]
   },
   Vasectomy:
   {
   In_network: array[125],
   Out_of_network: array[126]
   }
   },
   Diabetes_Care_Benefits:
   {
   Devices_equipment_and_non_testing_supplies:
   {
   In_network: array[127],
   Out_of_network: array[128]
   },
   Diabetes_self_management_training:
   {
   In_network: array[129],
   Out_of_network: array[130]
   }
   },
   Care_Outside_of_Plan_Service_Area:
   {
   Within_US_BlueCard_Program:
   {
   In_network: array[131],
   Out_of_network: array[132]
   },
   Outside_of_US_BlueCard_Worldwide:
   {
   In_network: array[133],
   Out_of_network: array[134]
   }
   }
   },
   Pediatric_Vision_Benefits:
   {
   Comprehensive_Eye_Exam:
   {
   Ophthalmologic:
   {
   Routine_ophthalmologic_exam_with_refraction_new_patient:
   {
   In_network: array[135],
   Out_of_network: array[136]
   },
   Routine_ophthalmologic_exam_with__refraction_established_patient:
   {
   In_network: array[137],
   Out_of_network: array[138]
   }
   },
   Optometric:
   {
   New_patient_exams:
   {
   In_network: array[139],
   Out_of_network: array[140]
   },
   Established_patient_exams:
   {
   In_network: array[141],
   Out_of_network: array[142]
   }
   }
   },
   Eyeglasses:
   {
   Lenses_one_pair_per_calendar_year:
   {
   Single_vision:
   {
   In_network: array[143],
   Out_of_network: array[144]
   },
   Conventional_bifocal:
   {
   In_network: array[145],
   Out_of_network: array[146]
   },
   Conventional_trifocal:
   {
   In_network: array[147],
   Out_of_network: array[148]
   },
   Lenticular:
   {
   In_network: array[149],
   Out_of_network: array[150]
   },
   Lenses_include_choice_of_glass_plastic_or_polycarbonate_lenses_all_lens_powers:
   {
   In_network: array[151],
   Out_of_network: array[152]
   }
   },
   Optional_Lenses_and_Treatments:
   {
   UV_coating:
   {
   In_network: array[153],
   Out_of_network: array[154]
   },
   Anti_reflective_coating:
   {
   In_network: array[155],
   Out_of_network: array[156]
   },
   High_index_lenses:
   {
   In_network: array[157],
   Out_of_network: array[158]
   },
   Photochromic_lenses_plastic:
   {
   In_network: array[159],
   Out_of_network: array[160]
   },
   Photochromic_lenses_glass:
   {
   In_network: array[161],
   Out_of_network: array[162]
   },
   Polarized_enses:
   {
   In_network: array[163],
   Out_of_network: array[164]
   },
   Standard_progressives:
   {
   In_network: array[165],
   Out_of_network: array[166]
   },
   Premium_progressives:
   {
   In_network: array[167],
   Out_of_network: array[168]
   }
   },
   Frame:
   {
   Collection_frames:
   {
   In_network: array[169],
   Out_of_network: array[170]
   },
   Non_Collection_frames:
   {
   In_network: array[171],
   Out_of_network: array[172]
   }
   },
   Contact_Lenses:
   {
   Non_Elective_Hard_or_soft_One_pair_per_Calendar_Year:
   {
   In_network: array[173],
   Out_of_network: array[174]
   },
   Elective_Standard_hard_One_pair_per_Calendar_Year:
   {
   In_network: array[175],
   Out_of_network: array[176]
   },
   Elective_Non_standard_hard_One_pair_per_Calendar_Year:
   {
   In_network: array[177],
   Out_of_network: array[178]
   },
   Elective_Standard_soft_One_pair_per_month_up_to_6_months_per_Calendar_Year:
   {
   In_network: array[179],
   Out_of_network: array[180]
   },
   Elective_Non_standard_soft_One_pair_per_month_up_to_3_months_per_Calendar_Year:
   {
   In_network: array[181],
   Out_of_network: array[182]
   }
   },
   Other_Pediatric_Vision_Benefits:
   {
   Supplemental_low_ision_testing_and_equipment:
   {
   In_network: array[183],
   Out_of_network: array[184]
   },
   Diabetes_management_referral:
   {
   In_network: array[185],
   Out_of_network: array[186]
   }
   }
   }
   } */
 });
 try
 {
  mongoose.connect(ConnectString, function (err)
  {
   if (err)
    return console.error(err);
  });
 } catch (err) {
  return (err);
 };

 try
 {
  DelBlueShield.findOneAndRemove({ User: array[0], Path: array[1]}, function (err, doc)
  {
   if (err) return console.error(err);
   NewBlueShield.save(function (err, thor)
   {
    if (err) return console.error(err);
    mongoose.disconnect();
   });
  });


 } catch (err) {
  mongoose.disconnect();
  return (err);
 };
  return ('<caption style="font-weight:bold">'+array[0]+', thank you for completing plan "'+array[2]+'" </caption><caption style="font-weight:bold">Company - "BlueShield"</caption><caption style="font-weight:bold">Path -' + array[1] + '</caption><caption style="font-weight:bold;">Network - '+array[23]+'</caption>');
};
