let stap = 0;
let antwoorden = {
  geluk: [],
  frustratie: "",
  inzicht: []
};

function toonVraag() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";

  if (stap === 0) {
    chatbox.innerHTML += `<p><strong>Chatboyt:</strong> Wat bracht je geluk vandaag?</p>`;
    for (let i = 0; i < 3; i++) {
      chatbox.innerHTML += `<input type='text' id='geluk${i}' placeholder='Geluksmoment ${i+1}' /><br>`;
    }
    chatbox.innerHTML += `<button onclick='verwerkGeluk()'>Verstuur</button>`;

  } else if (stap === 1) {
    chatbox.innerHTML += `<p><strong>Chatboyt:</strong> Wat frustreerde je vandaag?</p>`;
    chatbox.innerHTML += `<input type='text' id='frustratie' placeholder='Frustratie' /><br>`;
    chatbox.innerHTML += `<p><strong>Chatboyt:</strong> Dat is jammer, maar zijn er ook positieve dingen uitgekomen of heb je er iets van geleerd?</p>`;
    for (let i = 0; i < 2; i++) {
      chatbox.innerHTML += `<input type='text' id='inzicht${i}' placeholder='Inzicht ${i+1}' /><br>`;
    }
    chatbox.innerHTML += `<button onclick='verwerkFrustratie()'>Verstuur</button>`;

  } else if (stap === 2) {
    toonVerslag();
  }
}

function verwerkGeluk() {
  for (let i = 0; i < 3; i++) {
    const val = document.getElementById(`geluk${i}`).value.trim();
    antwoorden.geluk.push(val);
  }
  stap++;
  toonVraag();
}

function verwerkFrustratie() {
  antwoorden.frustratie = document.getElementById("frustratie").value.trim();
  for (let i = 0; i < 2; i++) {
    const val = document.getElementById(`inzicht${i}`).value.trim();
    antwoorden.inzicht.push(val);
  }
  stap++;
  toonVraag();
}

function toonVerslag() {
  document.body.innerHTML = `<h2>Verslag van je dag</h2>
    <p><strong>Positieve gebeurtenis:</strong> ${antwoorden.geluk.join(", ")}</p>
    <p><strong>Frustrerende gebeurtenis:</strong> ${antwoorden.frustratie}</p>
    <p><strong>Maar:</strong> ${antwoorden.inzicht[0]}</p>
    <p><strong>Maar:</strong> ${antwoorden.inzicht[1]}</p>`;
}

window.onload = toonVraag;