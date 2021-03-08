
export const themeInit = () => {
    let localStorageFruit;

    if(localStorage.getItem('fruit')) {
        localStorageFruit = localStorage.getItem('fruit');
    } else {
        localStorageFruit = 'strawberry';
    }

    fetch(`/profile/theme`, {
        method: "POST",
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
        localStorageFruit
        })
    })
    
    .then(function(res) {
        if (!res.ok) {
            console.log(res.statusText)
            throw Error(res.statusText); // handle any potential server errors
        }
        return res.json();
    })
}

export const themeInit2 = () => {
    let localStorageFruit;

    if(localStorage.getItem('fruit')) {
        localStorageFruit = localStorage.getItem('fruit');
    } else {
        localStorageFruit = 'strawberry';
    }
       

    fetch(`/lists/theme`, {
        method: "POST",
        headers: {
                "Content-Type": "application/json"
        },
        body: JSON.stringify({
        localStorageFruit
        })
    })
    .then(function(res) {
        if (!res.ok) {
            console.log(res.statusText)
            throw Error(res.statusText); // handle any potential server errors
        }
        return res.json();
    })
}



themeInit()
themeInit2()
