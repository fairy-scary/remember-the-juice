const themeInit = () => {
    if(localStorage.getItem('color')){
        let localStorageFruit = localStorage.getItem('logo');
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

const themeInit2 = () => {
    if(localStorage.getItem('color')){
        let localStorageFruit = localStorage.getItem('logo');
       

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