

export const makeotp=()=>{

   const otp =  Math.floor(100000+Math.random()*90000)
    
  const  expireTimeotp=  Date.now()+90*1000

  return {otp,expireTimeotp}

}

console.log(makeotp())