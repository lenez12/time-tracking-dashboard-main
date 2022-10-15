const container = document.querySelector(".container");
const navMenu = document.querySelector(".nav-menu");
const navLink = document.querySelectorAll(".nav-link");

document.addEventListener("DOMContentLoaded", async () => {
	removeReportItem();
	reportList();
	navMenu.addEventListener("click", async (e) => {
		let name = e.target.className;
		if (name == "nav-link") {
			navLink.forEach((item) => {
				item.className = "nav-link";
			});
			e.target.classList.add("active");
			removeReportItem();
			reportList(e.target.id);
		}
	});
});

const reportList = async (selected = "weekly") => {
	const data = await getDataFromFile();
	let selectedTime = "";
	if (selected == "weekly") {
		selectedTime = "Week";
	} else if (selected == "daily") {
		selectedTime = "Day";
	} else {
		selectedTime = "Month";
	}
	// let selected = "daily";
	data.forEach((item) => {
		const reportCard = document.createElement("div");
		reportCard.classList.add(
			"report-card",
			item.title.toLowerCase().split(" ").join("-"),
			"slide-in-bottom"
		);
		reportCard.innerHTML = `
                    <div class="report card">
					<div class="title flex">
						<h2>${item.title}</h2>
						<img src="images/icon-ellipsis.svg" alt="elips" class="more-dots" />
					</div>
					<div class="time flex">
						<h3>${item.timeframes[selected].current}hrs</h3>
						<p class="prev-time">Last ${selectedTime} - ${item.timeframes[selected].previous}hrs</p>
					</div>
				</div>
                `;
		container.appendChild(reportCard);
	});
};

const removeReportItem = () => {
	const reportCard = document.querySelectorAll(".report-card");
	reportCard.forEach((item) => {
		item.remove();
	});
};

const getDataFromFile = async () => {
	const data = await fetch("../data.json");
	return data.json();
};
