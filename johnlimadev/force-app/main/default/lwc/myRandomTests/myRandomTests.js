import { LightningElement } from 'lwc';

export default class MyRandomTests extends LightningElement {

    someString = 'This is a fixed value: ';

    favoriteColor = 'Blue';
    
    petNameUnderTheHood = '';
    petName = '';



    // For the first column
    handleClick(event) {
        let clickedButtonLabel = event.target.label;

        switch(clickedButtonLabel) {
            case 'Update Value':
                this.someString += 'x ';
                break;

            case 'Reset Value':
                this.someString = 'This is a fixed value: ';
              break;
              
            default:
              // code block
          }
    }
    


    // For the second column
    handleKeyUp(event) {
        this.favoriteColor = event.target.value;
    }
    
    handleClickFavoriteColor(event) {
        let clickedButtonLabel = event.target.label;

        switch(clickedButtonLabel) {
            case 'Erase Value':
                this.favoriteColor = '';
              break;
              
            default:
              // code block
          }
    }




    // For the third column
    handleKeyPressForPetName(event){
        if (event.which == 13) {
            this.petName = this.petNameUnderTheHood;
        }
    }

    updatePetName(event){
        this.petNameUnderTheHood = event.target.value;
    }

}