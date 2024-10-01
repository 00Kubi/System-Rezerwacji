// Funkcja generowania PDF z obsługą polskich znaków
function generatePDF(reservationDetails) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Ustawienia wstępne PDF
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Potwierdzenie rezerwacji", 105, 20, null, null, "center");

    // Dodanie logo lub nazwy firmy
    doc.setFontSize(16);
    doc.text("Rezerwacje.pl", 105, 30, null, null, "center");

    // Linie oddzielające
    doc.setDrawColor(0, 0, 0);  // Ustawienie koloru linii
    doc.line(10, 35, 200, 35);  // Linia na szerokość strony

    // Sekcja "Dane rezerwacji"
    doc.setFontSize(18);
    doc.setFont("helvetica", "normal");
    doc.text("Dane rezerwacji:", 10, 45);

    // Szczegóły rezerwacji - tabela
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");

    // Dane rezerwacji w tabeli
    const detailsYPosition = 55;
    doc.text(`Imie i nazwisko: ${reservationDetails.name}`, 10, detailsYPosition);
    doc.text(`E-mail: ${reservationDetails.email}`, 10, detailsYPosition + 10);
    doc.text(`Typ rezerwacji: ${reservationDetails.type}`, 10, detailsYPosition + 20);
    doc.text(`Data rezerwacji: ${reservationDetails.date}`, 10, detailsYPosition + 30);
    doc.text(`Godzina rezerwacji: ${reservationDetails.time}`, 10, detailsYPosition + 40);
    doc.text(`Numer rezerwacji: ${generateReservationNumber()}`, 10, detailsYPosition + 50);
    doc.text(`Status: Potwierdzona`, 10, detailsYPosition + 60);

    // Linie oddzielające
    doc.line(10, detailsYPosition + 70, 200, detailsYPosition + 70);

    // Informacje o firmie lub stopka
    doc.setFontSize(12);
    doc.text("Dziekujemy za skorzystanie z naszego systemu rezerwacji!", 105, detailsYPosition + 85, null, null, "center");
    doc.text("Kontakt: kontakt@rezerwacje.pl | Telefon: 123 456 789", 105, detailsYPosition + 95, null, null, "center");

    // Pobierz PDF
    doc.save("potwierdzenie_rezerwacji.pdf");
}

// Funkcja generowania losowego numeru rezerwacji
function generateReservationNumber() {
    return Math.floor(Math.random() * 1000000);  // Generowanie 6-cyfrowego numeru rezerwacji
}

// Obsługa formularza
document.getElementById('reservationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Pobranie danych z formularza
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const type = document.getElementById('type').value;

    // Sprawdzenie, czy wszystkie dane są poprawne
    if (name && email && date && time && type) {
        // Wyświetlenie szczegółów rezerwacji
        const reservationDetails = `
            <strong>Imie i nazwisko:</strong> ${name}<br>
            <strong>E-mail:</strong> ${email}<br>
            <strong>Typ rezerwacji:</strong> ${type}<br>
            <strong>Data:</strong> ${date}<br>
            <strong>Godzina:</strong> ${time}
        `;

        // Wyświetlenie w HTML
        const resultDiv = document.getElementById('reservationDetails');
        const resultInfo = document.getElementById('reservationInfo');
        resultInfo.innerHTML = reservationDetails;
        resultDiv.classList.remove('hidden');
        setTimeout(() => {
            resultDiv.classList.add('show');
        }, 10);

        // Zapisz szczegóły do użycia w PDF
        const reservationData = { name, email, date, time, type };

        // Obsługa przycisku do pobierania PDF
        document.getElementById('downloadPDF').addEventListener('click', function() {
            generatePDF(reservationData);
        });

    } else {
        // Komunikat o błędzie
        document.getElementById('reservationInfo').innerText = "Wszystkie pola są wymagane!";
    }
});
