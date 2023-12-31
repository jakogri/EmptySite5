var mongoose = require('mongoose');
var fs = require("fs");
var help_scripts = require('./HelpScripts');
var db = mongoose.connection;

var Schema = mongoose.Schema;

var plan_schema = new Schema(
    {
        plan_name: { type: [String], index: true }
    },{ autoIndex: false });

var schema = new Schema({
    User: String,
    Path: String,
    Plan: String,
    Network: String,
    General_Features:
    {
        Calendar_Year_Deductible:
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
        Annual_Out_of_Pocket_Maximum:
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
        PCP_Office_Visits:
        {
            In_network: String,
            Out_of_network: String
        },
        Specialist_Office_Visits:
        {
            In_network: String,
            Out_of_network: String
        },
        Urgently_Needed_Services:
        {
            In_network: String,
            Out_of_network: String
        },
        Outpatient_Prescription_Drug_Benefit:
        {
            Tier_1:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_2:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_3:
            {
                In_network: String,
                Out_of_network: String
            },
            Tier_4:
            {
                In_network: String,
                Out_of_network: String
            }
        }
    }


});

var SchemaNormal = new Schema({
    User: String,
    Network: String,
    PlanName: String,
    PlanType: String,
    FilePath: String,
    Deductible:
    {
        InNetwork:
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
    OOPLimit:
    {
        InNetwork:
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
    PCPVisit:
    {
        InNetwork: String
    },
    SpecialistVisit:
    {
        InNetwork: String,
        Out_of_network: String
    },
    UrgentCare:
    {
        InNetwork: String,
        Out_of_network: String
    },
    RxTier1:
    {
        InNetwork: String,
        Out_of_network: String
    },
    RxTier2:
    {
        InNetwork: String,
        Out_of_network: String
    },
    RxTier3:
    {
        InNetwork: String,
        Out_of_network: String
    },
    RxTier4:
    {
        InNetwork: String,
        Out_of_network: String
    }

});



exports.CopyCheckUnitedHealthCare = function (array, collection_name)
{
    var ConnectString = help_scripts.ConnectStr();
    var i, j;
    var UnitedHealthCare_source = mongoose.model('UnitedHealthCare', schema);
    var UnitedHealthCare_copy = mongoose.model(collection_name, SchemaNormal);
    var help_str, help_str1;
    try
    {
        mongoose.connect(ConnectString);
    } catch (err)
    {
        return (err);
    };
    for (i = 0; i < array.length; i++)
    {
        UnitedHealthCare_source.find({ Path: array[i] }, function (err, doc)
        {
            if (err) return console.error(err);
            var check_array = [];
            var data_array = [];
            var m;
            var CurPlanType;

            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].Plan;
            data_array[0] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Calendar_Year_Deductible.In_network.Member;
            data_array[1] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Calendar_Year_Deductible.In_network.Family;
            data_array[2] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Calendar_Year_Deductible.Out_of_network.Member;
            data_array[3] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Calendar_Year_Deductible.Out_of_network.Family;
            data_array[4] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Annual_Out_of_Pocket_Maximum.In_network.Member;
            data_array[5] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Annual_Out_of_Pocket_Maximum.In_network.Family;
            data_array[6] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Member;
            data_array[7] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
            for (m = 0; m < doc.length; m++) check_array[m] = doc[m].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Family;
            data_array[8] = help_scripts.GetCorrField(check_array);
            check_array.length = 0;
       (    for (m = 0; m 4 d�c>l�ngth;"m�+) cieck_arr`y[}U = d�c[m].General_Features*@CP_Office_Visqts.In_network;
     ( (   $dqta_arpay[9] = help_scrip�s.GetCorrFiEld(ch%gk_arsai+;
       `    check_array+lelgth = 0;
 `"         for (m =�4;`� < doc.leng4h; m++9 clecK_avray[m]0= doc[mU.Gener`l_Featurec.PcP_Office_VysitS.Ou4_of_feuworc;
     `      data_array[1] = julp_saripts.FetCovr�ield(bhecjOarray);
       `  0 cheak_array*langth�= 0;
            for (m < 4; m < doc.lenGth; }++) #heck_array[mU =�doc[e]Gelaral_Features&Spegialist_Offic�_Fismtc.In_networj;  "        0dataarray[11] = help_scripts.GetKorrField(cjE3k_arra�);
    �       chuck_`rray.lelgth = 0;
     $      vor m = 0; m <(dkc.leng|h{ m++- checK_array[m = doc[m].Generql_FeaturesSpeck`lhqt_Offyc_Visits.Out_og_nmtwork�
       �  ! d�taarray[12] = help_scripts.GetAorrField(check_�ray)?           check_array.�e~gvh = 0+
            for )m =003"m < `oc.lefgvh;!m++) check_asray[m] = doc[m].Genebal_Features*Urgently_Needed_Smrrices.In_netwmzk;
 (   `      dctaarray[13] = help_rcripts.GetCorrFi%lf check_aRray);
            check�arRay.length = 0;
            for (m = 0; o(< eoc.length; m++	 c�eck_array[mY 5 doc[m]/General_BeaturesnUrgently_Needed^Servicew.KutofWnevwork;
 0 0        DatE_arraxZ14](= lelp_scripts.GetorrField(c(eck_array);
     $      chec+_a�ray.le~guh =00;
          ( for (i =(0; m < doc.length;!m++)`check_array[o] = �oc[m].endral_Fe�tures.Oqtpctimnt_Prmscra�tion_Drug_enefkt.T)er_1.In�network?           `�atc_array[15] = huht_scri�ts.GetCorrField(check_array);
       �    check_array.length = 0;
           (bor (m =  ; m � doc.leng|h; m++! check_arrmy[m] = doc[�],oeneral_EeAttres.Outpqtient_Prescription_Erug_Benefit.Vier_1.�ut_kf_netWork;
           $data_a�ray[16] = helr_scripts.GetCorr�ield(chdcc_arrayi;
           0ch�ck_a�ray.lEngth ? 0;
 !      (   for *m = 0; m < $oc.ldng�h; m++) check_Arrqi[m] = eocm]*General_Featuras,Owtpatimnt_Presc2iption_DrugOBenefht.�ier_2In_.etwork;
0           dEda_array[57] = jelp_scripts.GetBorr�ield�sheck_arra9);
            checi_irray.length ="0�
 �          for (- = 0; m <(dob.length; m++	 checkarray[m] = dkc[m].General_Features.Outpatient_Prdscription_Drug_Benefit&Tigr_r.Out_of_network;
       "    dctaarray[18] = help_scripts.GetCorrField(chdck_array-;
            check_array.lgngth = 0;
        !�  for (m = 0;(m < doc.ldngth; m++) check_apray[m] =0dnc[m]&General_Features.Outpatient_Prescription_Dzug_Bgnefit.Tier_3.Io_jetwork;
   `  "     data_array[19] = hel�_scriptS.�e�CorrFheld(bheCk_array);
       !    check_array.lengdh = 0;            for (o = 0; � < doc.hength; m++) chegk_array[m] = doc[m].Gener!l_Feature3.Outpatient_P2escriptikn_Drug_BenefIt.Tier]3.Owt_of_network;
 ( !  `(    d�ta_array[20] = help_scripts.GetCnrrBield(check_array);* !       ` 0check_arra�.length = 0;
            for (m = 0; m < dgc.length; m++	 check_arruy[i] = Doc[m].General_FeqturesnOutpatimnt_�rescription[Drug^Benefi|.Tier_3.O�t_of_networ{;
   `   ` �  data_arrayZ21] 5 halp_scripts.Ce�CorrDield(chgck_`r�ay);
            check_arr�y.length $0;
   0        for (m = 0; m < doc.length; m++) check_�2r`y[m] = docKm].General_�eaturgs&Ouupatment_Prescription_Dsug_Benefit.Tier_3.Out_of_network;
      ( `  (data_array[22]$= hmlp_scripts.FetCo�rFiele(check_array);
  "( (      check_arra�.lengdh = 0?            �or (m(= 0; G < doc.length; m++) check_array[m] = doc[m].Network;
 &          data_array[03] = help_scriptsnGetCorrDiel`(check_array);
         "  check_array.length = 0;
  "       ` m = 0;
            help_str = toc[0].@ath;
            while (m %= 1)
      "     {         $      help_strq < helr_str,substring(0, help_str.indexOf('/));
   `   b`    (  help_stR = help_str*substring(help_str.indexOf('/') + 1);
               "if (help_str.indexOf('/') < �)
                {J  0    �            if!(help_str1.indexOf)'M�') != -1- CurPlalType = 'HMM';
  $     �         � else if (help_s4r1.indExOf('PPO')"!= -9)"urPla�Type$= 'TPO';
             !      else if ,help_gtr1.Indexof(/HSA#) != -1) CurPlenType = 'HSA';*                    alse CurPlanType = '';
    "              `m = 1;
      �`0       };0           };
      (     var NewUoitedHealthCare"= new UnitedHealthCare_copy({
  $ "(          Network: 'UnitmdHealthcare',
  `     � `     PlanName: data_array[0],
      �         @lanPype: CqrPlanType,
         "      Fil�Path: doc[0].Pcth,
 0              Deduc5ybhe:
 $            ! {
     0       (     InNetwork:
    `         (     {
` $          "  (      0Member: tata_array[1],
                  0  !  F`mily: data_crray[2]
              �     },
          !!        Out_o�_network:
                  $ {
      $                 Member: data_array[3],
        $      "        Family: date_array[4]
   $"h    "     0   }
  !  0(         },
  �             �OPLimi�:
      "   $     {
                0   InNetwork:
                   �{
           ( �          Member:(data_arrey[5],
!                       Family: data_array[6]
    (   0`0         ],
      `          $  Out_of[network:
             (      {M
            !           Member: data_array[7Y,
 !          !           Falily: data_array[8]
           "        }
                },
    "    �     "PCPVi�it:
                {
                    InNetwork: da�a_array_9],
"                   Outof_netw/rk: data_array[10]
        �       },M
    (           Speci�lIstVisit:
      0      "  [
            �       InNetwork: data_ar2ay[1)],
"!          $ d     Out_of_n�twork: daua_array[12]
      "    !    },
              " UrgenpCaRe:
  !            "{
   `  �             InNedwork2 dataWarra9[13],
      �    �        Out_of_network: data�array[14]
   0     "      },
               "RxTierq:
  0            !{
 !          `       IlNe4work: dava_array[15],
         "        ` Out_oF_�etwork: data_arrcy[16]
                },
               0RxTier2:
             0  {         !          InNetwork: data_�rray[17],
      (     (       Out_of_oe4ork: dada_arrcy[18M�
                },
                rxTier3:
         !      {
                    K~Network:bdata_array19],
   $     �    (     Out_of_ndt7o�k: data_arra{[20]
          $     },
!      (      ( Rx�ier4:
 !    �    $    {
   !                InNetwork: dati_arraY[21],
       !            Owt_of_ne4work: data_array[22]
      "      "  }


   0        })3
            ury
 `       0  {
     !"         NdwUniuedHeAdthCare.save(vunction (ers, thor)
                x
                  ( ib 8err) �eturj console.e�ror(err)+

         !    " );
         �  } cat#h (err)
  $         {
        !    `  mongoose.eiscon~oct();
                re|wrl (err):
 !          };        });

    m;
    repurn(('Copying of "Unkted@malthC!re" in a collection "' + col�ectinn_nalg +�'" took pl!ce suscessfully');
}
	
exportq.SetC`eckWnitedHealt(Care = function (rgsi
{
" � vas SonfectString = help_scri0ts.Ck.~gauStr();
 d  var docs = �];
    ver path� = []+�  0var result[str = '';
    var FindUnitefHeal|hCAre = mo.goose.modeh('UnitedhealthC!re', schema+;
    try
 0  {
`       mngo/se.cgnnecthcknnectString);
    } catch (err	
    {M
  0     return (err);    };
    db.o.("error", consode.error.bind(coNsole, #confecti�n error:"));
 (  try
 0  {* 0      FindUnitedHealthCare.distinCt('Path', {�, funcvyon (arr, paths)        {            if (err+ revurn c�Sole.esRoz(err);
    ,      FiNfSnitedHmalthCAre.f)nl({�, functioN 8err, d�cs)M
 !!"`       {
      $         if (%rr9 retern conso|e�error(err!;)
         $   0  Var i, m;
        !  0 $0 vaR j = 0;
�  0"          (var k;
                war count_result = [�;
   �      "     var cur_�occ = [];
    "           vaR$check_arriy = []   "            while (j < 0aths.length!     !"    $    {
       $  ""   �    count_resUlt[j] = 0
0             `     CurplanType 9`'';
  "  $" (       `   k = 0;       $            h = 0;
    (       "    $( cur_dcs.length = 0;
  `   0         �   while (k < Docs.l�ngth-
             0    0 y
          0 ($          in`(p�ths[j] 9= dmcs[k].Path)
!0            0   " ,   {
   !     �     !    �!     0cur_docs[i] = tgcs{k];
$    0 (                    i++;
                      " };
 !                     !k++;
      0    `       "=
          ! (  !    ch%ck_array.length = 0;      "   0         for (m = 0� } < i; m++- check_array[m_ =!cur_do�sSe].Network;
                    if`(help_s#ripts.ChuckCorrField(cheak_array) !=#1) coTnt_resulp[j] = coujt_resUm|[j] + 1;
          !         chekk_array.lengvh = 0;
      (  0          for (m = 4; m < i; m++9$checkSerray[m] = cur_docs[m].Plan;
(!$         !     $ kf�(xdlp_skrip|s.ChecKCorrFi%ld(check_arr!y)(!= 1) count_re{ult[j] = count�re3ulv[j] + q;
  0    0            check_array.leNgth = 0;
  !                 fo� )} = 0; m < i;0�)+) check_array[m] = cur_docw[m].G%neral_Features.Calendaw_yeA2_Deductibla.In_.etwork.Member{
   �                if (ielp_scripts.CheckCorrField(cleak_cRrcy) != 1) countresult[j] = �ouNt_rErulT[j] + 1;
        �          �check_array.mength = 0;
   )             `  for (m = 0; m < i; m++) checkarBaym] = cu2_docs[m].eneral_Features.Kale.dar_Year_Deductible.In_network.Family;
0`         "      �$if )halp_scripts.CheckCo�rField(#hdck_array) != 1) couft_result[j] = count_rasult[j] + 1;    "    `          ahe#k_arriy.length = 0;
   0             0  for (m"= 09 m < i; m++) bhec{_array[m] = curWdocs[m].General_Features.Calendar_Year_Deducdible.Outof_network.Member;
           $      "$if (h%lpScripts.ChtckCorrFiedd(chekk_array) != 1) count_resuld[j] = count_result[j] + 19
    "    `     !$0  chegj_arrey.lgngth =(0;
         (  �       �os (m = 09 m`< i3 m++) check_array[-] = cur_docs[m].General_Features.CadendAz�Year_Deduceible>Nut_of_network-Damily;
                    if (�elp_scripts.CheckCgrrField(checiarr!y+ !=`1) count_zesqlt[j] � ckunt_res5lt[j] + 1;
                    check_arsay.lencth = 09-
              #     for 8m = 0; m < i{ m++)`che#k_arraY[m]$= cur_docs[m].genera|_Features.Anlual_OutOof_Pocket_Maximum.In_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Annual_Out_of_Pocket_Maximum.In_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Member;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Family;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.PCP_Office_Visits.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.PCP_Office_Visits.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Specialist_Office_Visits.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Specialist_Office_Visits.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Urgently_Needed_Services.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Urgently_Needed_Services.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_1.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_1.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_2.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_2.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_3.In_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_3.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_4.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    for (m = 0; m < i; m++) check_array[m] = cur_docs[m].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_4.Out_of_network;
                    if (help_scripts.CheckCorrField(check_array) != 1) count_result[j] = count_result[j] + 1;
                    check_array.length = 0;
                    result_str = result_str + '<tr><td>' + paths[j]+ '</td><td>' + count_result[j] + '</td><td>';
                    if (count_result[j] == 0)
                        result_str = result_str + '<input type="checkbox" name="check_result' + j.toString() + '"></td></tr>';
                    else
                        result_str = result_str + '<input type="hidden" name="check_result' + j.toString() + '"></td></tr>';
                    result_str = result_str + '<input type="hidden" id="paths_result' + j.toString() + '" name="paths_result' + j.toString() + '" value="' + paths[j] + '">';
                    j++;
                }
                result_str = result_str + '<input type="hidden" id="count_str" name="count_str" value="' + j.toString() + '">';
                str = fs.readFileSync('./inputpages/UnitedHealthCare_result.html', "utf-8") + result_str;
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

exports.SetUnitedHealthCareNormal = function ()
{
    var UnitedHealthCareCount = 0;
    var NewUnitedHealthCareNormal;
    var ConnectString = help_scripts.ConnectStr();
    var docs = [];
    var FindUnitedHealthCare = mongoose.model('UnitedHealthCare', schema);
    var UnitedHealthCareNormal = mongoose.model('UnitedHealthCareNormal', SchemaNormal);
    var FindAUnitedHealthCareCount = 0;
    try
    {
        mongoose.connect(ConnectString);
    } catch (err) {
        return (err);
    };
    db.on("error", console.error.bind(console, "connection error:"));
    try
    {
        FindUnitedHealthCare.count({}, function (err, count)
        {
            FindUnitedHealthCareCount = count;
        });
    } catch (err) {
        mongoose.disconnect();
        return (err);
    };
    try
    {
        FindUnitedHealthCare.find({}, function (err, docs)
        {
            if (err) return console.error(err);
            var i = 0;
            var CurPlanType;
            while (i < FindUnitedHealthCareCount)
            {
                if (docs[i].Network.indexOf('HMO') >= 0) CurPlanType = 'HMO';
                else CurPlanType = 'PPO';
                NewUnitedHealthCareNormal = new UnitedHealthCareNormal({
                    User: docs[i].String,
                    Network: 'UnitedHealthcare',
                    PlanName: docs[i].Plan,
                    PlanType: docs[i].CurPlanType,
                    FilePath: docs[i].Path,
                    Deductible:
                    {
                        InNetwork:
                        {
                            Member: docs[i].General_Features.Calendar_Year_Deductible.In_network.Member,
                            Family: docs[i].General_Features.Calendar_Year_Deductible.In_network.Family
                        },
                        Out_of_network:
                        {
                            Member: docs[i].General_Features.Calendar_Year_Deductible.Out_of_network.Member,
                            Family: docs[i].General_Features.Calendar_Year_Deductible.Out_of_network.Family
                        }
                    },
                    OOPLimit:
                    {
                        InNetwork:
                        {
                            Member: docs[i].General_Features.Annual_Out_of_Pocket_Maximum.In_network.Member,
                            Family: docs[i].General_Features.Annual_Out_of_Pocket_Maximum.In_network.Family
                        },

                        Out_of_network:
                        {
                            Member: docs[i].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Member,
                            Family: docs[i].General_Features.Annual_Out_of_Pocket_Maximum.Out_of_network.Family
                        }
                    },
                    PCPVisit:
                    {
                        InNetwork: docs[i].General_Features.PCP_Office_Visits.In_network,
                        Out_of_network: docs[i].General_Features.PCP_Office_Visits.Out_of_network
                    },
                    SpecialistVisit:
                    {
                        InNetwork: docs[i].General_Features.Specialist_Office_Visits.In_network,
                        Out_of_network: docs[i].General_Features.Specialist_Office_Visits.Out_of_network
                    },
                    UrgentCare:
                    {
                        InNetwork: docs[i].General_Features.Urgently_Needed_Services.In_network,
                        Out_of_network: docs[i].General_Features.Urgently_Needed_Services.Out_of_network
                    },
                    RxTier1:
                    {
                        InNetwork: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_1.In_network,
                        Out_of_network: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_1.Out_of_network
                    },
                    RxTier2:
                    {
                        InNetwork: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_2.In_network,
                        Out_of_network: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_2.Out_of_network
                    },
                    RxTier3:
                    {
                        InNetwork: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_3.In_network,
                        Out_of_network: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_3.Out_of_network
                    },
                    RxTier4:
                    {
                        InNetwork: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_4.In_network,
                        Out_of_network: docs[i].General_Features.Outpatient_Prescription_Drug_Benefit.Tier_4.Out_of_network
                    }
                });
                NewAUnitedHealthCareNormal.save(function (err, thor)
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
    return('UnitedHealthCareNormal - complet.');
};

exports.SaveUnitedHealthCare = function (array)
{
    var ConnectString = help_scripts.ConnectStr();
    var UnitedHealthCare = mongoose.model('UnitedHealthCare', schema);
    var DelUnitedHealthCare = mongoose.model('UnitedHealthCare', schema);
    var key_str = '';
    key_str = key_str + array[1] + '|' + array[2];
    var NewUnitedHealthCare = new UnitedHealthCare({
        User: array[0],
        Path: array[1],
        Plan: array[2],
        Network: array[25],
        General_Features:
        {
            Calendar_Year_Deductible:
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
            Annual_Out_of_Pocket_Maximum:
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
            PCP_Office_Visits:
            {
                In_network: array[11],
                Out_of_network: array[12]
            },
            Specialist_Office_Visits:
            {
                In_network: array[13],
                Out_of_network: array[14]
            },
            Urgently_Needed_Services:
            {
                In_network: array[15],
                Out_of_network: array[16]
            },
            Outpatient_Prescription_Drug_Benefit:
            {
                Tier_1:
                {
                    In_network: array[17],
                    Out_of_network: array[18]
                },
                Tier_2:
                {
                    In_network: array[19],
                    Out_of_network: array[20]
                },
                Tier_3:
                {
                    In_network: array[21],
                    Out_of_network: array[22]
                },
                Tier_4:
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
        DelUnitedHealthCare.findOneAndRemove({ User: array[0], Path: array[1] }, function (err, doc)
        {
            if (err) return console.error(err);
            NewUnitedHealthCare.save(function (err, thor)
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

    return ('<caption style="font-weight:bold">' + array[0] + ', thank you for completing plan "' + array[2] + '" </caption><caption style="font-weight:bold">Company - "UnitedHealthCare"</caption><caption style="font-weight:bold">Path -' + array[1] + '</caption><caption style="font-weight:bold">Network - ' + array[25] + '</caption>');
};