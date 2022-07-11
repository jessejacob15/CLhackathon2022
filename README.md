### Welcome to TeaLink's Repo!

Welcome to TeaLink, the first open-ended peer-to-peer news betting protocol on the Ethereum network. TeaLink provides a platform for users to create custom bets on anything and everything, using a Chainlink oracle and NewsAPI.org to verify whether or not the bet-upon event has occurred by searching for keywords given by the bet creator in news headlines.

## Here’s how it works: 

You can create a bet that something will show up in the news by selecting keywords or key-phrases that you believe will appear in future headlines if the event comes to pass. For example, if you think that A$AP Rocky and Rihanna will break up, you might create a bet with “Rocky”, “Rihanna”, and “break up” as your keywords. Once your bet is created it will be listed on the TeaLink bet marketplace where other users can buy-in to accept it. News API will then query every headline generated by relevant outlets for your keywords, and if enough headlines containing them are found you will win your TeaLink bet! 

Using our novel headline keyword betting mechanism, TeaLink allows users to make bets in both traditional areas, like the outcome of sporting events - using for example “Verstappen” + “Wins” + “Monaco Grand Prix” as keywords - and in areas that have never before been included in organized betting such as celebrity relationships, the outcomes of prominent lawsuits, global conflicts, etc.

## Creating a bet:

Heading over to our “Create Bet” page, you will see that you get to set a variety of parameters for each bet you create. Let’s run through each one. 

# Title: What your bet will be called on the bet marketplace.

# Accept by date: The deadline for your bet to be accepted by another user.
If your bet is not accepted by the accept by date, it will expire and your ETH will be refunded. 

# Bet expiration date: The deadline for the event to occur if your bet is accepted.
This serves as the deadline for your keywords to appear in news headlines. If your keywords do not appear in any headlines by your designated expiration date, you will lose the bet.

# Bet amount: The amount you as the bet creator are wagering for your keywords to appear
Your bet amount will be deposited into the protocol and locked upon bet creation, and will either be returned if your bet is not accepted by the “accept by” date, returned along with winnings (i.e. accept value) if your bet is accepted and you win, or lost to the person betting against you if the bet expiration date arrives without your keyword conditions being met. 

# Accept value: The value that somebody betting against you must wager to enter the bet.
If a user wants to accept your bet on the bet marketplace, they will have to deposit the accept value. By setting both the bet amount and accept value, you get to set the odds on each bet you create.

# Number of Articles: The number of articles with headlines containing your keywords needed to fulfill the bet.
Use this number to change how widespread or popular you think the news will be. Changing this number can increase the likelihood of your bet being accepted.

# Keywords: 
The words that News API will search for within headlines to determine if your event has occurred or not. This is the central criteria of the bet.
Note that all keywords must be present in a headline for it to count towards the given number of articles. It doesn’t matter which order the words are in, so long as they are all present.
If you give keywords as phrases, for example “Biden re-elected” vs. “Biden” + “re-elected”, only articles containing the entire phrase will count towards the given number of articles.

# Picking the sources: 
If you choose not to pick sources, News API will query its entire catalog of news outlets, including over 80,000 publications and reputable blogs, for titles containing your keywords. Alternatively, you can choose to limit the scope of the query to any combination of the 27 major news outlets shown on the “create bet” page. 

Once a bet is created, it is listed in full on the bet marketplace under “open bets” and users can accept it by wagering the accept value. If a bet is accepted, it will appear under the “accepted bets” tab in the bet marketplace where users can check the status of their bets.

Key details:
All bets are made in Ethereum.
All bet creations carry a service fee of .001 ETH to cover the cost of Chainlink services used to validate the bet. 
As there is a cost associated with checking if a bet has been won, the protocol will only automatically determine the winner at the bet expiration date. However users can pay gas fees to check the status of their bet at any time, and if the bet creator’s win conditions have been met the bet will immediately close and the payout will occur. 

TeaLink is built using the Hardhat Framework and below explains commands of how to run hardhat tasks taken from chainlink hardhat repo and is bootstrapped from this repo:  https://github.com/smartcontractkit/hardhat-starter-kit

