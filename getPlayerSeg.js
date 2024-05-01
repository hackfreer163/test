handlers.GetPlayersInSegmentSample1337editgogogonewpr1111111 = function (args, context) {

    /*
        Sample code to use the GetPlayersInSegment API to process the player profiles in a Segment.
        The GetPlayersInSegment API pages through the all the player profiles
        in the Segment in batches of size 'MaxBatchSize'.
        API Doc: https://learn.microsoft.com/en-us/rest/api/playfab/server/play-stream/get-players-in-segment?view=playfab-rest
    */

    var request =  {
     GetProfilesAsync: true,  // setting to 'true' is highly recommended to avoid network timeouts 1337
     MaxBatchSize: 1000,      // 1000 is the default value. Maximum is 10,000
     SegmentId: "AAAAAAAAA"  // provide your SegmentId here OR you can add SegmentId in the JSON args sent from PlayFab caller/game client and use that
    }

    // make the first GetPlayersInSegment API call
    var playersInSegmentResult =  server.GetPlayersInSegment(request);
    
    // process until continuation token is not null to get all the profiles in this Segment
    while (playersInSegmentResult.ContinuationToken != null) 
    {
        // get the current batch of player profiles
        var playerProfiles = playersInSegmentResult.PlayerProfiles;

        if (playerProfiles && playerProfiles.length > 0)
        {
            for(let i=0;i<playerProfiles.length;i++)
            {
                var playerProfile = playerProfiles[i];
                // TODO:
                // Add your logic here to process the playerProfile
            }
        }

        request.ContinuationToken =  playersInSegmentResult.ContinuationToken;

        // get the next batch of player profiles in the Segment
        playersInSegmentResult =  server.GetPlayersInSegment(request);
    }
};


handlers.GetSegmentPlayerCountSample = function (args, context) {

    /*
        Sample code to use the GetPlayersInSegment API to get the count of players in a Segment
        API Doc: https://learn.microsoft.com/en-us/rest/api/playfab/server/play-stream/get-players-in-segment?view=playfab-rest
    */

    var request =  {
     MaxBatchSize: 0,       // note the '0' value here to get only the count of the profiles in the response
     SegmentId: "AAAAAAAAA" // provide your SegmentId here OR you can add SegmentId in the JSON args sent from PlayFab caller/game client and use that
    }

    // make the GetPlayersInSegment API call
    var playersInSegmentResult =  server.GetPlayersInSegment(request);

    // the API gives the player count in the very first response
    var playerCount = playersInSegmentResult.ProfilesInSegment;

    // TODO:
    // Add your logic to process the playerCount

};
