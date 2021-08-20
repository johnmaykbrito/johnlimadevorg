public with sharing class Notepad {
    public Notepad() {

    }
}
// <template>
//   <template if:true={profilenamebool}>
//     <template if:true={orderstatusbool}>
//         <div class="slds-align_absolute-center">
//             Are you sure you want to approve this Sample Request?
            
//         </div><br/>
//         <div class="slds-align_absolute-center">
//             <lightning-button-group>
//                 <lightning-button  label="Approve" onclick={approvehandler}></lightning-button>
//                 <lightning-button  label="Cancel" onclick={closeQuickAction}></lightning-button>
//             </lightning-button-group>
//         </div>
//     </template>
//       <template if:false={orderstatusbool}>
//         <div class="slds-align_absolute-center">
//             Order is not in Pending Approval Status!
//         </div>
//      </template>
// </template>
// <template if:false={profilenamebool}>
//     <div class="slds-align_absolute-center">
//         You can not perform this operation
//     </div>
// </template>









//     
//     
//     closeQuickAction() {
//    const closeQA = new CustomEvent('close');
//    this.dispatchEvent(closeQA);
//  }