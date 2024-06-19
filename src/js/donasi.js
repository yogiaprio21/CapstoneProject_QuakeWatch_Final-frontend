document.addEventListener("DOMContentLoaded", function () {
  // Select all donation buttons by their ID
  const donasiButtons = document.querySelectorAll("[id^=donasiButton]");
  const kirimButton = document.getElementById("kirimButton");

  // Variable to hold the id of the selected donation button
  let selectedDonationId = null;

  // Add click event listener to each donation button
  donasiButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Capture the id of the clicked button
      selectedDonationId = button.getAttribute("data-target");
      const currentProgress = document.getElementById(`progressAmount${selectedDonationId}`).innerText.replace('Rp. ', '');

      // Redirect to Donasi.html with the donation card id
      window.location.href = `Donasi.html?donationCardId=${selectedDonationId}&currentProgress=${currentProgress}`;
    });
  });

  // Check URL parameters on Donasi.html
  const urlParams = new URLSearchParams(window.location.search);
  const donationCardId = urlParams.get('donationCardId');
  const currentProgress = urlParams.get('currentProgress');

  if (donationCardId) {
    // Set hidden input values with the URL parameters
    document.getElementById('donationCardId').value = donationCardId;
    document.getElementById('currentProgress').value = currentProgress ? parseFloat(currentProgress) : 0;
  }

  if (kirimButton) {
    kirimButton.addEventListener("click", function () {
      const donationCardId = document.getElementById('donationCardId').value;
      const currentProgress = parseFloat(document.getElementById('currentProgress').value);
      const donationAmount = parseFloat(document.getElementById('formattedInput').value.replace(/[^0-9,-]+/g,""));

      if (donationCardId && !isNaN(donationAmount)) {
        const newProgress = currentProgress + donationAmount;

        // Update the progress bar width and amount
        window.localStorage.setItem(`progressBar${donationCardId}`, newProgress);

        // Redirect back to index.html
        window.location.href = 'index.html';
      } else {
        alert('Please enter a valid donation amount.');
      }
    });
  }

  // Update progress bars on index.html
  if (window.location.pathname.includes('index.html')) {
    for (let i = 1; i <= 3; i++) {
      const progressAmount = window.localStorage.getItem(`progressBar${i}`);
      if (progressAmount) {
        document.getElementById(`progressAmount${i}`).innerText = `Rp. ${parseFloat(progressAmount).toLocaleString('id-ID')}`;
        document.getElementById(`progressBar${i}`).style.width = `${(parseFloat(progressAmount) / 1000000) * 100}%`; // Assuming 1 million is the goal
      }
    }
  }
});

// Format input value to Rupiah currency format
function formatRupiah(input) {
  let value = input.value.replace(/[^,\d]/g, '').toString();
  const split = value.split(',');
  let rupiah = split[0].substring(0, split[0].length % 3) + split[0].substring(split[0].length % 3).match(/\d{3}/g).join('.');
  input.value = 'Rp. ' + rupiah + (split[1] != undefined ? ',' + split[1] : '');
}
