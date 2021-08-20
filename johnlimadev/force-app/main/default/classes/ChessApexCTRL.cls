public class ChessApexCTRL {
    @AuraEnabled
    public static String publishEvent(String message) {
        System.debug('publishEvent() method invoked successfully');
        nhoj__Chess__e chessEvent = new nhoj__Chess__e (nhoj__Message__c = message);
        Database.SaveResult sr = EventBus.publish(chessEvent);
        if (sr.isSuccess()) {
            System.debug('Successfully published event.');
        } else {
            for(Database.Error err : sr.getErrors()) {
                System.debug('Error returned: ' +
                             err.getStatusCode() +
                             ' - ' +
                             err.getMessage());
            }
        }
        return message;
    }
    
    @AuraEnabled
    public static String setPlayer() {
        List<ChessConfig__c> gameL = [SELECT Id, Name, nhoj__Player_1__c, nhoj__Player_2__c FROM nhoj__ChessConfig__c];
        
        if (gameL.isempty()) {
            return 'List is empty: there\'s no config object.';
        }
        
        ChessConfig__c game = gameL.get(0);
        System.debug('Game:');
        System.debug(game);
        
        String player = '';
        
        if (game.player_1__c == null) {
            // set P1
            game.player_1__c = UserInfo.getUserId();
            player = '1';
            
        } else if (game.player_2__c == null) {
            // set P2
            game.player_2__c = UserInfo.getUserId();
            player = '2';
        }
        
        update game;
        
        return '{"player" : "'+ player +'", "id": "'+ UserInfo.getUserId() +'"}';
    }

}