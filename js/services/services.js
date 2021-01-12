const postData = async(url,data) => { // async and await роблять з асинхронной функції - синхронну
    const res = await fetch(url,{ // await - почекати
        method: 'POST',
        headers: {
            'Content-type':'application/json'
        },
        body: data
    })
    return await res.json()
    }


export {postData}