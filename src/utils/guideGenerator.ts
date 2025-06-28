import { MassGuideOptions } from '@/types/massGuide';

export function generateGuideContent(options: MassGuideOptions): string {
  let html = `
    <h1 style="text-align: center; color: #8B4513; font-size: 24pt; margin-bottom: 10px;">Guide to the Catholic Mass</h1>

    <h2 style="color: #8B4513; font-size: 16pt; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #8B4513;">The Introductory Rites</h2>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All stand. The priest enters and venerates the altar.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Sign of the Cross</h3>
    <p><strong>Priest:</strong> In the name of the Father, and of the Son, and of the Holy Spirit.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Greeting</h3>`;

  // Add selected greeting
  if (options.greeting === 'grace') {
    html += `<p><strong>Priest:</strong> The grace of our Lord Jesus Christ, and the love of God, and the communion of the Holy Spirit be with you all.</p>`;
  } else if (options.greeting === 'peace') {
    html += `<p><strong>Priest:</strong> Grace to you and peace from God our Father and the Lord Jesus Christ.</p>`;
  } else if (options.greeting === 'lord') {
    html += `<p><strong>Priest:</strong> The Lord be with you.</p>`;
  }
  html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And with your spirit.</p>`;

  // Add selected penitential act
  html += `<h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Penitential Act</h3>`;
  if (options.penitential === 'confiteor') {
    html += `
      <p><strong>All:</strong> I confess to almighty God<br>
      and to you, my brothers and sisters,<br>
      that I have greatly sinned,<br>
      in my thoughts and in my words,<br>
      in what I have done and in what I have failed to do,</p>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(Strike breast)</p>
      <p><strong>All:</strong> through my fault, through my fault,<br>
      through my most grievous fault;<br>
      therefore I ask blessed Mary ever-Virgin,<br>
      all the Angels and Saints,<br>
      and you, my brothers and sisters,<br>
      to pray for me to the Lord our God.</p>`;
  } else if (options.penitential === 'mercy') {
    html += `
      <p><strong>Priest:</strong> Have mercy on us, O Lord.</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> For we have sinned against you.</p>
      <p><strong>Priest:</strong> Show us, O Lord, your mercy.</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And grant us your salvation.</p>`;
  } else if (options.penitential === 'invocations') {
    html += `
      <p><strong>Priest:</strong> You were sent to heal the contrite of heart:</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Lord, have mercy.</p>
      <p><strong>Priest:</strong> You came to call sinners:</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Christ, have mercy.</p>
      <p><strong>Priest:</strong> You are seated at the right hand of the Father to intercede for us:</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Lord, have mercy.</p>`;
  }

  html += `
    <p><strong>Priest:</strong> May almighty God have mercy on us, forgive us our sins, and bring us to everlasting life.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>`;

  // Add Kyrie if selected
  if (options.kyrie !== 'skip') {
    html += `<h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Kyrie</h3>`;
    const kyrieText = options.kyrie === 'latin' ? 'Kyrie, eleison' : 'Lord, have mercy';
    const christeText = options.kyrie === 'latin' ? 'Christe, eleison' : 'Christ, have mercy';

    html += `
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> ${kyrieText}. ${kyrieText}.</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> ${christeText}. ${christeText}.</p>
      <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> ${kyrieText}. ${kyrieText}.</p>`;
  }

  // Add Gloria if selected
  if (options.gloria === 'include') {
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Gloria</h3>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(When indicated, usually on Sundays and feast days)</p>
      <p><strong>All:</strong> Glory to God in the highest,<br>
      and on earth peace to people of good will.<br>
      We praise you, we bless you, we adore you, we glorify you,<br>
      we give you thanks for your great glory,<br>
      Lord God, heavenly King, O God, almighty Father.<br>
      Lord Jesus Christ, Only Begotten Son,<br>
      Lord God, Lamb of God, Son of the Father,<br>
      you take away the sins of the world, have mercy on us;<br>
      you take away the sins of the world, receive our prayer;<br>
      you are seated at the right hand of the Father, have mercy on us.<br>
      For you alone are the Holy One, you alone are the Lord,<br>
      you alone are the Most High, Jesus Christ,<br>
      with the Holy Spirit, in the glory of God the Father. Amen.</p>`;
  } else {
    html += `<p style="font-style: italic; color: #999; font-size: 10pt;"><em>Gloria is sung on Sundays and feast days (not during Advent or Lent)</em></p>`;
  }

  html += `
    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Collect (Opening Prayer)</h3>
    <p><strong>Priest:</strong> Let us pray.</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Pause for silent prayer)</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Priest says the Collect prayer)</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h2 style="color: #8B4513; font-size: 16pt; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #8B4513;">The Liturgy of the Word</h2>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All sit for the readings</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">First Reading</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Reader concludes:)</p>
    <p><strong>Reader:</strong> The word of the Lord.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Thanks be to God.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Responsorial Psalm</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Cantor sings verses, all respond with the refrain)</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Second Reading</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(On Sundays and major feasts)</p>
    <p><strong>Reader:</strong> The word of the Lord.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Thanks be to God.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Gospel</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All stand</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Gospel Acclamation - usually "Alleluia")</p>
    <p><strong>Priest/Deacon:</strong> The Lord be with you.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And with your spirit.</p>
    <p><strong>Priest/Deacon:</strong> A reading from the holy Gospel according to N.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Glory to you, O Lord.</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Gospel is proclaimed)</p>
    <p><strong>Priest/Deacon:</strong> The Gospel of the Lord.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Praise to you, Lord Jesus Christ.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Homily</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All sit. Brief silence for reflection may follow.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Creed</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All stand (on Sundays and major feasts)</p>`;

  // Add selected creed
  if (options.creed === 'nicene' || options.creed === 'both') {
    html += `
      <h4 style="color: #8B4513; font-size: 12pt; margin-top: 15px; margin-bottom: 6px;">Niceno-Constantinopolitan Creed</h4>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(Usually used)</p>
      <p><strong>All:</strong> I believe in one God, the Father almighty,<br>
      maker of heaven and earth, of all things visible and invisible.<br>
      I believe in one Lord Jesus Christ, the Only Begotten Son of God,<br>
      born of the Father before all ages.<br>
      God from God, Light from Light, true God from true God,<br>
      begotten, not made, consubstantial with the Father;<br>
      through him all things were made.<br>
      For us men and for our salvation he came down from heaven,</p>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(All bow)</p>
      <p><strong>All:</strong> and by the Holy Spirit was incarnate of the Virgin Mary, and became man.</p>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(Stand upright)</p>
      <p><strong>All:</strong> For our sake he was crucified under Pontius Pilate,<br>
      he suffered death and was buried,<br>
      and rose again on the third day in accordance with the Scriptures.<br>
      He ascended into heaven and is seated at the right hand of the Father.<br>
      He will come again in glory to judge the living and the dead<br>
      and his kingdom will have no end.<br>
      I believe in the Holy Spirit, the Lord, the giver of life,<br>
      who proceeds from the Father and the Son,<br>
      who with the Father and the Son is adored and glorified,<br>
      who has spoken through the prophets.<br>
      I believe in one, holy, catholic and apostolic Church.<br>
      I confess one Baptism for the forgiveness of sins<br>
      and I look forward to the resurrection of the dead<br>
      and the life of the world to come. Amen.</p>`;
  }

  if (options.creed === 'apostles' || options.creed === 'both') {
    if (options.creed === 'both') html += `<h4 style="color: #8B4513; font-size: 12pt; margin-top: 15px; margin-bottom: 6px;">Apostles' Creed</h4><p style="font-style: italic; color: #999; font-size: 10pt;">(Sometimes used during Lent and Easter)</p>`;
    html += `
      <p><strong>All:</strong> I believe in God, the Father almighty,<br>
      Creator of heaven and earth,<br>
      and in Jesus Christ, his only Son, our Lord,</p>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(All bow)</p>
      <p><strong>All:</strong> who was conceived by the Holy Spirit, born of the Virgin Mary,</p>
      <p style="font-style: italic; color: #999; font-size: 10pt;">(Stand upright)</p>
      <p><strong>All:</strong> suffered under Pontius Pilate,<br>
      was crucified, died and was buried;<br>
      he descended into hell;<br>
      on the third day he rose again from the dead;<br>
      he ascended into heaven,<br>
      and is seated at the right hand of God the Father almighty;<br>
      from there he will come to judge the living and the dead.<br>
      I believe in the Holy Spirit, the holy catholic Church,<br>
      the communion of saints, the forgiveness of sins,<br>
      the resurrection of the body, and life everlasting. Amen.</p>`;
  }

  html += `
    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Prayer of the Faithful</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Intercessions are offered)</p>`;

  // Add selected faithful response
  if (options.faithful === 'mercy') {
    html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Lord, in your mercy. <em>Hear our prayer.</em></p>`;
  } else {
    html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Lord, hear our prayer.</p>`;
  }

  html += `<p style="font-style: italic; color: #999; font-size: 10pt;">All sit after the concluding prayer</p>

    <h2 style="color: #8B4513; font-size: 16pt; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #8B4513;">The Liturgy of the Eucharist</h2>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Presentation of the Gifts</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Offertory song as gifts are brought forward)</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Priest prepares the gifts. If prayers are said aloud:)</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Blessed be God for ever.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Prayer over the Offerings</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All stand</p>
    <p><strong>Priest:</strong> Pray, brethren, that my sacrifice and yours<br>
    may be acceptable to God, the almighty Father.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> May the Lord accept the sacrifice at your hands<br>
    for the praise and glory of his name,<br>
    for our good and the good of all his holy Church.</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Prayer over the Offerings)</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Eucharistic Prayer</h3>
    <p><strong>Priest:</strong> The Lord be with you.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And with your spirit.</p>
    <p><strong>Priest:</strong> Lift up your hearts.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> We lift them up to the Lord.</p>
    <p><strong>Priest:</strong> Let us give thanks to the Lord our God.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> It is right and just.</p>

    <p style="font-style: italic; color: #999; font-size: 10pt;">(Preface concludes with:)</p>`;

  // Add selected Sanctus
  if (options.sanctus === 'english') {
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Holy, Holy, Holy</h3>
      <p><strong>All:</strong> Holy, Holy, Holy Lord God of hosts.<br>
      Heaven and earth are full of your glory.<br>
      Hosanna in the highest.<br>
      Blessed is he who comes in the name of the Lord.<br>
      Hosanna in the highest.</p>`;
  } else if (options.sanctus === 'latin') {
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Sanctus</h3>
      <p><strong>All:</strong> Sanctus, Sanctus, Sanctus Dominus Deus Sabaoth.<br>
      Pleni sunt caeli et terra gloria tua.<br>
      Hosanna in excelsis.<br>
      Benedictus qui venit in nomine Domini.<br>
      Hosanna in excelsis.</p>`;
  } else { // both
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Holy, Holy, Holy / Sanctus</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; padding-right: 15px; vertical-align: top;">
            <p><strong>English:</strong><br>
            Holy, Holy, Holy Lord God of hosts.<br>
            Heaven and earth are full of your glory.<br>
            Hosanna in the highest.<br>
            Blessed is he who comes in the name of the Lord.<br>
            Hosanna in the highest.</p>
          </td>
          <td style="width: 50%; padding-left: 15px; vertical-align: top; border-left: 1px solid #ddd;">
            <p><strong>Latin:</strong><br>
            Sanctus, Sanctus, Sanctus Dominus Deus Sabaoth.<br>
            Pleni sunt caeli et terra gloria tua.<br>
            Hosanna in excelsis.<br>
            Benedictus qui venit in nomine Domini.<br>
            Hosanna in excelsis.</p>
          </td>
        </tr>
      </table>`;
  }

  html += `

    <p style="font-style: italic; color: #999; font-size: 10pt;">(Eucharistic Prayer continues... After the words of Consecration:)</p>
    <p><strong>Priest:</strong> The mystery of faith.</p>`;

  // Add selected mystery of faith
  if (options.mystery === 'proclaim') {
    html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> We proclaim your Death, O Lord,<br>and profess your Resurrection until you come again.</p>`;
  } else if (options.mystery === 'eat') {
    html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> When we eat this Bread and drink this Cup,<br>we proclaim your Death, O Lord, until you come again.</p>`;
  } else if (options.mystery === 'save') {
    html += `<p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Save us, Saviour of the world,<br>for by your Cross and Resurrection you have set us free.</p>`;
  }

  html += `
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Prayer concludes with the Great Doxology:)</p>
    <p><strong>Priest:</strong> Through him, and with him, and in him,<br>
    O God, almighty Father, in the unity of the Holy Spirit,<br>
    all glory and honour is yours, for ever and ever.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h2 style="color: #8B4513; font-size: 16pt; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #8B4513;">The Communion Rite</h2>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">The Lord's Prayer</h3>
    <p><strong>Priest:</strong> At the Saviour's command and formed by divine teaching, we dare to say:</p>
    <p><strong>All:</strong> Our Father, who art in heaven, hallowed be thy name;<br>
    thy kingdom come, thy will be done on earth as it is in heaven.<br>
    Give us this day our daily bread,<br>
    and forgive us our trespasses, as we forgive those who trespass against us;<br>
    and lead us not into temptation, but deliver us from evil.</p>

    <p><strong>Priest:</strong> Deliver us, Lord, we pray... and the coming of our Saviour, Jesus Christ.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> For the kingdom, the power and the glory are yours now and for ever.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Sign of Peace</h3>
    <p><strong>Priest:</strong> Lord Jesus Christ... Who live and reign for ever and ever.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>
    <p><strong>Priest:</strong> The peace of the Lord be with you always.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And with your spirit.</p>
    <p><strong>Priest:</strong> Let us offer each other the sign of peace.</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Exchange sign of peace)</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Breaking of the Bread</h3>`;

  // Add selected Agnus Dei
  if (options.agnus === 'english') {
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Lamb of God</h3>
      <p><strong>All:</strong> Lamb of God, you take away the sins of the world, have mercy on us.<br>
      Lamb of God, you take away the sins of the world, have mercy on us.<br>
      Lamb of God, you take away the sins of the world, grant us peace.</p>`;
  } else if (options.agnus === 'latin') {
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Agnus Dei</h3>
      <p><strong>All:</strong> Agnus Dei, qui tollis peccata mundi, miserere nobis.<br>
      Agnus Dei, qui tollis peccata mundi, miserere nobis.<br>
      Agnus Dei, qui tollis peccata mundi, dona nobis pacem.</p>`;
  } else { // both
    html += `
      <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Lamb of God / Agnus Dei</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="width: 50%; padding-right: 15px; vertical-align: top;">
            <p><strong>English:</strong><br>
            Lamb of God, you take away the sins of the world, have mercy on us.<br>
            Lamb of God, you take away the sins of the world, have mercy on us.<br>
            Lamb of God, you take away the sins of the world, grant us peace.</p>
          </td>
          <td style="width: 50%; padding-left: 15px; vertical-align: top; border-left: 1px solid #ddd;">
            <p><strong>Latin:</strong><br>
            Agnus Dei, qui tollis peccata mundi, miserere nobis.<br>
            Agnus Dei, qui tollis peccata mundi, miserere nobis.<br>
            Agnus Dei, qui tollis peccata mundi, dona nobis pacem.</p>
          </td>
        </tr>
      </table>`;
  }

  html += `

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Invitation to Communion</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All kneel</p>
    <p><strong>Priest:</strong> Behold the Lamb of God,<br>
    behold him who takes away the sins of the world.<br>
    Blessed are those called to the supper of the Lamb.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Lord, I am not worthy that you should enter under my roof,<br>
    but only say the word and my soul shall be healed.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Communion</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Bow head before receiving)</p>
    <p><strong>Minister:</strong> The Body of Christ. <em>(or: The Blood of Christ)</em></p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>Communicant:</strong> Amen.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Prayer after Communion</h3>
    <p style="font-style: italic; color: #999; font-size: 10pt;">All stand after silent prayer/communion song</p>
    <p><strong>Priest:</strong> Let us pray.</p>
    <p style="font-style: italic; color: #999; font-size: 10pt;">(Silent prayer, then Prayer after Communion)</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h2 style="color: #8B4513; font-size: 16pt; margin-top: 25px; margin-bottom: 10px; border-bottom: 1px solid #8B4513;">The Concluding Rites</h2>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Blessing</h3>
    <p><strong>Priest:</strong> The Lord be with you.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> And with your spirit.</p>
    <p><strong>Priest:</strong> May almighty God bless you,<br>
    the Father, and the Son, and the Holy Spirit.</p>
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Amen.</p>

    <h3 style="color: #8B4513; font-size: 14pt; margin-top: 20px; margin-bottom: 8px;">Dismissal</h3>`;

  // Add selected dismissal
  if (options.dismissal === 'ended') {
    html += `<p><strong>Priest/Deacon:</strong> Go forth, the Mass is ended.</p>`;
  } else if (options.dismissal === 'announce') {
    html += `<p><strong>Priest/Deacon:</strong> Go and announce the Gospel of the Lord.</p>`;
  } else if (options.dismissal === 'glorify') {
    html += `<p><strong>Priest/Deacon:</strong> Go in peace, glorifying the Lord by your life.</p>`;
  } else if (options.dismissal === 'peace') {
    html += `<p><strong>Priest/Deacon:</strong> Go in peace.</p>`;
  }

  html += `
    <p style="font-style: italic; color: #666; margin-left: 20px;"><strong>All:</strong> Thanks be to God.</p>

    <hr style="margin-top: 40px; border: 1px solid #8B4513;">
    <p style="text-align: center; font-size: 10pt; color: #666; margin-top: 20px;">
    <em>This guide is based on the English translation of The Roman Missal © 2010, International Commission on English in the Liturgy Corporation.</em>
    </p>`;

  return html;
}