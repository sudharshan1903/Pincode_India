let mainDiv = document.createElement("div");
mainDiv.classList.add("container");
document.body.append(mainDiv);

let contentCard = `
<div class="card mt-5">
    <div class="card-body">
        <h5 class="card-title">Indian PIN Codes</h5>
        <div class="input-group mb-3">
            <input type="text" class="form-control" id="searchBox" placeholder="Enter Pincode" aria-label="Enter Pincode" aria-describedby="search-button">
            <button class="btn btn-primary" type="button" id="search">Search</button>
        </div>
        <div id="contentId" class="form-text"></div>
    </div>
</div>
<div id="cardList" class="mt-4"></div>`;

mainDiv.innerHTML = contentCard;

let searchBtn = document.getElementById("search");
let inputSearch = document.getElementById("searchBox");
let contentId = document.getElementById("contentId");
let secDiv = document.getElementById("cardList");

searchBtn.addEventListener("click", async (event) => {
    const value = inputSearch.value.trim();
    if (value !== "" && /^\d{6}$/.test(value)) {
        await getPINCodeInfo(value);
    } else {
        contentId.innerText = "Error: Enter a valid 6-digit PIN code";
        setTimeout(() => {
            contentId.innerText = "Enter a number";
            inputSearch.value = "";
        }, 2000);
    }
});

const getPINCodeInfo = async (pincode) => {
    try {
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
        const data = await response.json();

        if (data && data[0].Status === "Success") {
            console.log(data[0].PostOffice[0].Name);
            inputSearch.value = "";
            console.log(data, "data");

            
            let content = data[0].PostOffice;
            let concatenatedText = content.map(ele => ele.Name).join(', ');

            
            let newCard = document.createElement("div");
            newCard.classList.add("card", "mt-3");
            newCard.innerHTML = `
                <div class="m-3">
                    <label class="form-label">Search Result</label>
                    <div class="form-text">${concatenatedText}</div>
                </div>`;
            secDiv.appendChild(newCard);
        } else {
            console.log("Invalid PIN Code or no information available.");
            setTimeout(() => {
                contentId.innerText = "Invalid PIN Code or no information available.";
            }, 2000);
        }
    } catch (error) {
        console.error("Error fetching PIN Code information:", error);
    }
};
