function getResponse(data) {
    let server_cost = 0
    let audiobooks= {}
    let unique_users = {}

    data.plays.forEach(played => {
        const audiobook = data.costs.find(cost => cost.audiobook_id === played.audiobook_id)
        const book_id = audiobook.audiobook_id
        const book_cost = audiobook.cost_per_second
        const user = played.user_id
        const new_cost = book_cost * played.seconds

        server_cost += new_cost
        if(audiobooks[book_id]) {
            audiobooks[book_id].cost += new_cost
            
            const position = unique_users[book_id].indexOf(user)
            if(position === -1 ) {
                audiobooks[book_id].number_unique_users++
                unique_users[book_id].push(user)
            }

        } else {
            audiobooks[book_id] = {
                cost: new_cost,
                number_unique_users: 1,
            }
            unique_users[book_id] = [user]
         }
    })

    return {
        server_cost: server_cost,
        audiobooks: audiobooks,
    }
}

const data = require('./input.json')
const response = getResponse(data)
console.log(response)