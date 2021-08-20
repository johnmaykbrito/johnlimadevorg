({
    turn : 'white',
    lastpieceplayed : 'black',
    origin : {
        x : null,
        y : null
    },
    destination : {
        x : null,
        y : null
    },
    draggedpiece : null,
    iswhite : null,
    message : {
        white: '',
        black: '',
        numbofplayers: 0,
        issetuppage: true,
        playedlast: 'black'
    },
    handleDragStart : function(component, event) {
        // Set origin and destination
        if (this.turn == 'white'  && $A.get("$SObjectType.CurrentUser.Id") == this.message.white) {
        	this.origin.x = event.target.parentNode.parentNode.rowIndex;
            this.origin.y = event.target.parentNode.cellIndex;
            this.draggedpiece = event.target;
            
        } else if (this.turn == 'black'  && $A.get("$SObjectType.CurrentUser.Id") == this.message.black) {
            this.origin.x = event.target.parentNode.parentNode.rowIndex;
            this.origin.y = event.target.parentNode.cellIndex;
            this.draggedpiece = event.target; 
        }
        
    },
    
    setOrigin : function() {
        
    },
    
    handleDrop : function(component, event) {
        // Set origin and destination
        if (this.turn == 'white'  && $A.get("$SObjectType.CurrentUser.Id") == this.message.white) {
           this.destination.x = event.target.parentNode.rowIndex;
        	this.destination.y = event.target.cellIndex;
            
        } else if (this.turn == 'black'  && $A.get("$SObjectType.CurrentUser.Id") == this.message.black) {
            this.destination.x = event.target.parentNode.rowIndex;
        	this.destination.y = event.target.cellIndex;
        }
        
        // Validate move {between 1,1 e 8,8 inclusive}
        var table = document.getElementById('mytable');
        var cell = table.rows[this.destination.x].cells[this.destination.y];
        this.iswhite  = this.draggedpiece.className.includes('white');
        
        // White move
        if (cell.childNodes.length == 0 && this.iswhite && this.turn == 'white' && $A.get("$SObjectType.CurrentUser.Id") == this.message.white) {
            alert('Logged: White. You should play now. It\'s your turn.');
            cell.appendChild(this.draggedpiece);
            this.turn = 'black';
            this.lastpieceplayed = 'white';
            
            this.message.origin = this.origin;
        	this.message.destination = this.destination;
            this.message.playedlast = 'white';
          
        // Black move
        } else if (cell.childNodes.length == 0 && !this.iswhite && this.turn == 'black' && $A.get("$SObjectType.CurrentUser.Id") == this.message.black) {
            alert('Logged: Black. You should play now. It\'s your turn.');
            cell.appendChild(this.draggedpiece);
            this.turn = 'white';
            this.lastpieceplayed = 'black';
            
            this.message.origin = this.origin;
        	this.message.destination = this.destination;
            this.message.playedlast = 'black';
            
        } else {
            console.log('handleDrop: It was else.');
        }
        
        //console.log('Changed this.turn to:', this.turn);
        var pname = this.pieceBeingDragged(this.draggedpiece, this.iswhite);
        
        if (this.draggedpiece.className.includes('black-pawn')) {
            //console.log('It is a black-pawn');
        }
        
        console.log('MESSAGE PLAYEDLAST:');
        console.log(this.message.playedlast);
        
        if (this.message.origin != null && this.message.destination != null) {
            console.log('from: (' + this.message.origin.x + ', ' + this.message.origin.y + ')');
            console.log('to: (' + this.message.destination.x + ', ' + this.message.destination.y + ')');
            console.log('------------');
            this.setAndFireEvent(component, event);
        } else {
            alert('There is no such attributes on this.message.');
        }
        
        
    },
    
    pieceBeingDragged : function(piece, isWhite) {
        let piecename = isWhite ? 'white' : 'black';
        
        if (piece.className.includes(piecename + '-pawn')) {
            piecename += '-pawn';
        } else if (piece.className.includes(piecename + '-rook')) {
            piecename += '-rook';
        } else if (piece.className.includes(piecename + '-knight')) {
            piecename += '-knight';
        } else if (piece.className.includes(piecename + '-bishop')) {
            piecename += '-bishop';
        } else if (piece.className.includes(piecename + '-queen')) {
            piecename += '-queen';
        } else if (piece.className.includes(piecename + '-king')) {
            piecename += '-king';
        }
        
        //console.log('Dragged piece is axactly: ', piecename);
        return piecename;
    },
    
    // Invokes the subscribe method on the empApi component
    subscribe : function(component, event, helper) {
        // Get the empApi component
        const empApi = component.find('empApi');
        // Get the channel from the input box
        const channel = '/event/nhoj__Chess__e';
        // Replay option to get new events
        const replayId = -1;
        
        // Subscribe to an event
        empApi.subscribe(channel, replayId, $A.getCallback(eventReceived => {
            // Process event (this is called each time we receive an event)
            //console.log('Received event ', JSON.parse(JSON.stringify(eventReceived)));
            let payload = JSON.parse(JSON.stringify(eventReceived)).data.payload.nhoj__Message__c;
            payload = JSON.parse(payload);
            
            console.log('Event received... Payload is:');
            console.log(payload);
            
            if (this.message.issetuppage) {
                if (payload.white != null && payload.white != '' && component.get('v.hasChosenWhite') == false) {
                    component.set('v.hasChosenWhite', true);
                    this.message.white = payload.white;
                    this.message.numbofplayers++;
            		
                    
                } 
                
                if (payload.black != null && payload.black != '' && component.get('v.hasChosenBlack') == false) {
                    component.set('v.hasChosenBlack', true);
                    this.message.black = payload.black;
                    this.message.numbofplayers++;
                    
                }
                
                if (this.message.numbofplayers == 2 && component.get('v.hasTwoPlayers') == false) {
                    component.set('v.hasTwoPlayers', true);
                    this.message.issetuppage = false;
                }
            } else if (!this.message.issetuppage) {
    
                if (payload.playedlast == 'white') {
    				console.log('black\'s turn...');
                    this.message.playedlast = 'white';
    				this.turn = 'black';
                    this.lastpieceplayed = 'white';
    
                } else if (payload.playedlast == 'black') {
    				console.log('white\'s turn...');
                    this.message.playedlast = 'black';
    				this.turn = 'white';
                    this.lastpieceplayed = 'black';
                }

    			if (this.turn == 'white' && $A.get("$SObjectType.CurrentUser.Id") == this.message.white) {
    				console.log('white will reproduce...');
                    var table = document.getElementById('mytable');
        			var piece = table.rows[payload.origin.x].cells[payload.origin.y].firstChild;
                    var destinationcell = table.rows[payload.destination.x].cells[payload.destination.y];
                    destinationcell.appendChild(piece);
                    component.set('v.isWhiteDraggable', true);
                    component.set('v.isBlackDraggable', false);
                    alert('White now is draggable');
                    
    
                } else if (this.turn == 'black' && $A.get("$SObjectType.CurrentUser.Id") == this.message.black) {
    				console.log('black will reproduce');
                    var table = document.getElementById('mytable');
        			var piece = table.rows[payload.origin.x].cells[payload.origin.y].firstChild;
                    var destinationcell = table.rows[payload.destination.x].cells[payload.destination.y];
                    destinationcell.appendChild(piece);
                    component.set('v.isWhiteDraggable', false);
                    component.set('v.isBlackDraggable', true);
                    alert('black now is draggable');
                }

                console.log('State:');
                console.log('this.turn:');
                console.log(this.turn);
                console.log('this.lastpieceplayed:');
                console.log(this.lastpieceplayed);
                console.log('this.message:');
                console.log(this.message);
    				
            }            
        }))
            .then(subscription => {
            // Confirm that we have subscribed to the event channel.
            // We haven't received an event yet.
            console.log('Subscribed to channel ', subscription.channel);
            // Save subscription to unsubscribe later
            component.set('v.subscription', subscription);
        });
        },
            
            // Invokes the unsubscribe method on the empApi component
            unsubscribe : function(component, event, helper) {
                // Get the empApi component
                const empApi = component.find('empApi');
                // Get the subscription that we saved when subscribing
                const subscription = component.get('v.subscription');
                
                // Unsubscribe from event
                empApi.unsubscribe(subscription, $A.getCallback(unsubscribed => {
                    // Confirm that we have unsubscribed from the event channel
                    console.log('Unsubscribed from channel '+ unsubscribed.subscription);
                    component.set('v.subscription', null);
                }));
                },
                    
                    setPlayer : function (component, event, helper, color) {
                        //console.log('setting player up...');
                        var action = component.get("c.setPlayer");
                        
                        action.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                
                                let playerinfo = JSON.parse(response.getReturnValue());
                                
                                if (playerinfo.player == 1) {
                                    if (color == 'white') {
                                        this.message.white = playerinfo.id;
                                        
                                    } else if (color == 'black') {
                                        this.message.black = playerinfo.id;
                                        
                                    } 
                                    this.setAndFireEvent(component, event);
                                    
                                } else if (playerinfo.player == 2) {
                                    if (color == 'white') {
                                        this.message.white = playerinfo.id;
                                        
                                    } else if (color == 'black') {
                                        this.message.black = playerinfo.id;
                                        
                                    }
                                    this.setAndFireEvent(component, event);
                                }
                                
                            } else if (state === "INCOMPLETE") {
                                // UNDO move
                                
                            } else if (state === "ERROR") {
                                // UNDO move
                                
                                var errors = response.getError();
                                if (errors) {
                                    if (errors[0] && errors[0].message) {
                                        console.log("Error message: " + 
                                                    errors[0].message);
                                    }
                                } else {
                                    console.log("Unknown error");
                                }
                            }
                        });
                        $A.enqueueAction(action);
                        
                    },
                    
                    setAndFireEvent : function (component, event) {
                        // Call apex controller and publish platform event with the message
                        console.log('Publishing event... The message is:');
                        console.log(this.message);

                        
                        var action = component.get("c.publishEvent");
                        action.setParams({ message : JSON.stringify(this.message) });
                        
                        action.setCallback(this, function(response) {
                            var state = response.getState();
                            if (state === "SUCCESS") {
                                //alert("From server: " + response.getReturnValue());
                                
                            } else if (state === "INCOMPLETE") {
                                // UNDO move
                                
                            } else if (state === "ERROR") {
                                // UNDO move
                                
                                var errors = response.getError();
                                if (errors) {
                                    if (errors[0] && errors[0].message) {
                                        console.log("Error message: " + 
                                                    errors[0].message);
                                    }
                                } else {
                                    console.log("Unknown error");
                                }
                            }
                        });
                        $A.enqueueAction(action);
                    }
                })