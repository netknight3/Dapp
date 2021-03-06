import { useEffect } from "react"
import useSWR from "swr"

const adminAddress ={
  "0x2e21c8589059501fa3a14c320464b771ab020bae924805ebba58aeb439740394" : true
}

export const handler = (web3, provider) => () => {

  const {data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      const account = accounts[0]

      if (!account) {
        throw new Error("Cannot retreive an account. Please refresh the browser.")
      }

      return account
    }
  )

  useEffect(() => {
    const mutator = accounts => mutate(accounts[0] ?? null)
    provider?.on("accountsChanged", mutator)
    return () => {
      provider?.removeListener("accountsChanged", mutator)
    }
  }, [provider])

  return { 
    data,
    isAdmin: ( 
      data && 
      adminAddress[web3.utils.keccak256(data)]) ?? false,
    mutate, 
    ...rest
  }
}