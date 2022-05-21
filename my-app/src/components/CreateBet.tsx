import Button from '@mui/material/Button'
import { useState } from 'react'
import { useMoralis } from 'react-moralis'
import betgame from '../betgame'
import web3 from '../web3'
import { MyForm } from './Form'

function CreateBet() {
  // const [name, setName] = React.useState('Composed TextField');
  const [title, setTitle] = useState('Hey there')
  const {
    authenticate,
    isAuthenticated,
    isAuthenticating,
    user,
    account,
    logout,
  } = useMoralis()

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setName(event.target.value);
  //   };

  const buildApiURL = (apiKeywords: string[], sources: string[]) => {
    let beginningStr = 'https://newsapi.org/v2/everything?'

    // should store API key somewhere else
    let endingStr =
      '&searchin=title&language=en&pagesize=1&apiKey=340014d50e764937b75f19426bdd5265'

    // may need to encode the value for q => API docs say it must be URL encoded
    // method exists to do this, just not sure if necessary
    let keywordStr = 'q='
    apiKeywords.forEach((keyword, index) => {
      if (index !== apiKeywords.length - 1) {
        keywordStr = keywordStr + '+' + keyword + ','
      } else {
        keywordStr = keywordStr + '+' + keyword
      }
    })
    // console.log(keywordStr)

    let sourceStr = '&sources='
    sources.forEach((source, index) => {
      if (index !== sources.length - 1) {
        sourceStr = sourceStr + source + ','
      } else {
        sourceStr = sourceStr + source
      }
    })
    // console.log(sourceStr)

    let finalApiURL = beginningStr.concat(keywordStr, sourceStr, endingStr)

    // console.log(finalApiURL)

    // console.log(
    //   finalApiURL ===
    //     'https://newsapi.org/v2/everything?q=+rocky,+arrest&sources=the-verge,time,the-huffington-post&searchin=title&language=en&pagesize=1&apiKey=340014d50e764937b75f19426bdd5265',
    // )

    return finalApiURL
  }

  const convertToUnix = (date: Date) => {
    // setting time to 00:00:00.00, meaning midnight of that date.
    // should we change this? should we have it be 23:59:59.99 of the
    // date from user so it makes it inclusive?
    // need to communicate to user how we are handling this on the form either way
    date.setHours(0, 0, 0, 0)

    let timestampInMs = date.getTime()
    let unixTimestamp = Math.floor(date.getTime() / 1000)
    // console.log(unixTimestamp)
    return unixTimestamp
  }

  const createBet = async (
    apiURL: string,
    acceptValue: string,
    countArts: number,
    endDate: number,
    acceptDate: number,
    betAmount: string,
  ) => {
    console.log('Calling createBet function')
    const userAddress = await user!.get('ethAddress')

    await betgame.methods
      .createBet(
        apiURL,
        web3.utils.toWei(acceptValue, 'ether'),
        countArts,
        endDate,
        acceptDate,
      )
      .send({
        from: userAddress,
        value: web3.utils.toWei(betAmount, 'ether'),
      })
  }

  return (
    <div style={{ textAlign: 'center' }}>
      <MyForm
        onSubmit={({
          title,
          acceptDeadline,
          outcomeDeadline,
          acceptAmount,
          betAmount,
          numArticles,
          apiKeywords,
          sources,
        }) => {
          const apiURL = buildApiURL(apiKeywords, sources)
          console.log(apiURL)
          const unixAcceptDate = convertToUnix(acceptDeadline)
          console.log(unixAcceptDate)
          const unixExpirationDate = convertToUnix(outcomeDeadline)
          console.log(unixExpirationDate)
          const acceptAmountStr = acceptAmount.toString()
          console.log('Accept:', acceptAmountStr)
          const betAmountStr = betAmount.toString()
          console.log('Bet:', betAmountStr)

          createBet(
            apiURL,
            acceptAmountStr,
            numArticles,
            unixExpirationDate,
            unixAcceptDate,
            betAmountStr,
          )
        }}
      />
      {/* <Button onClick={createBet} variant="outlined">
        Create
      </Button> */}
      {isAuthenticated ? (
        <h1>{user!.get('ethAddress')}</h1>
      ) : (
        <h1>User is not authenticated!</h1>
      )}
    </div>
  )
}

export default CreateBet
