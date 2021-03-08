
export const themeInit = () => {
    if(localStorage.getItem('fruit')){
        let localStorageFruit = localStorage.getItem('fruit');
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
}}

export const themeInit2 = () => {
    if(localStorage.getItem('fruit')){
        let localStorageFruit = localStorage.getItem('fruit');
       

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
}


themeInit()
themeInit2()
