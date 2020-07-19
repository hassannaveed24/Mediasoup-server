# Mediasoup-server


###########################
###########################
###########################
GET API /getPotentialCase
this will return array of object where each object represents a 
patient(
    imageURL: String,
    floor: String,
    location:{
        top: String,
        right: String
    },
    timestamp:{
        type: Date,
        default: new Date
    },
    locationName: String,
    readings:{
        thermometer: String,
        oxymeter: String
    }
)

###########################
###########################
###########################

POST API /savePotentialCase
this will save potential 
patient(
imageURL: String,
    floor: String,
    location:{
        top: String,
        right: String
    },
    timestamp:{
        type: Date,
        default: new Date
    },
    locationName: String,
    readings:{
        thermometer: String,
        oxymeter: String
    }
) in database and then emit potentialPateint details as socket event 'broadcastPotentialPatient'

###########################
###########################
###########################

emit potentialPateint details as socket event 'broadcastPotentialPatient'
    
   
###########################
###########################
##########################


POST API /addThreshold
add new 
threshold(
    temperatreThreshold: {
        from: {
            type: Number,
            default: 37
        },
        to: {
            type: Number,
            default: 38
        }
    },
    oxymeterThreshold: {
        from: {
            type: Number,
            default: 75
        },
        to: {
            type: Number,
            default: 100
        }
    }
)


###########################
###########################
##########################

GET API /viewThreshold
send threshold stored in db  in the form of threshold Schema

 temperatreThreshold: {
        from: {
            type: Number,
            default: 37
        },
        to: {
            type: Number,
            default: 38
        }
    },
    oxymeterThreshold: {
        from: {
            type: Number,
            default: 75
        },
        to: {
            type: Number,
            default: 100
        }
    }
    
###########################
###########################
##########################

GET API send message   /sendmessage/:type/:entranceName/:id
send message to respective roles i.e. SecirityTeam or CLeaningTeam which was passed through params 
if success then throw response 

Message has been Sent.




