# Dries Uytterschaut (182254du)

- [ ] Front-end Web Development
  - [GitHub repository](github.com/HOGENT-Web)
  - [Online versie](github.com/HOGENT-Web)
- [x] Web Services: GITHUB URL
  - [GitHub repository](https://github.com/Web-IV/2223-webservices-DriesU/tree/master)
  - [Online versie](https://github.com/DriesU/webservices_fact)

**Logingegevens**

- Gebruikersnaam/e-mailadres: dries uytterschaut
- Wachtwoord:test123!


## Projectbeschrijving

Bij dit project is het de bedoeling dat gebruikers feiten kunnen bekijken, het is ook mogelijk om feiten te bekijken met de categorie erbij.<br/> 
Als een gebruiker een feit leuk vindt, kan de gebruiker dat aangeven en komt het bij hun persoonlijke lijst met gelikte feiten.<br/> 
Deze lijst kunnen ze ook afzonderlijk bekijken.<br />
Moderators kunnen feiten toevoegen terwijl gebruikers alleen de feiten kunnen lezen en liken.


## Screenshots
![erd](media/eerd.png)


## Behaalde minimumvereisten

### Web Services

- **datalaag**

  - [x] voldoende complex (meer dan één tabel)
  - [x] één module beheert de connectie + connectie wordt gesloten bij sluiten server
  - [x] heeft migraties
  - [x] heeft seeds
<br />

- **repositorylaag**

  - [x] definieert één repository per entiteit (niet voor tussentabellen) - indien van toepassing
  - [ ] mapt OO-rijke data naar relationele tabellen en vice versa
<br />

- **servicelaag met een zekere complexiteit**

  - [x] bevat alle domeinlogica
  - [x] bevat geen SQL-queries of databank-gerelateerde code
<br />

- **REST-laag**

  - [x] meerdere routes met invoervalidatie
  - [x] degelijke foutboodschappen
  - [x] volgt de conventies van een RESTful API
  - [x] bevat geen domeinlogica
  - [x] degelijke authorisatie op alle routes 
  - [ ] degelijke authenticatie op alle routes
<br />

- **varia**
  - [x] een aantal niet-triviale testen (min. 1 controller >=80% coverage)
  - [ ] minstens één extra technologie
  - [x] duidelijke en volledige `README.md`
  - [ ] maakt gebruik van de laatste ES6-features (object destructuring, spread operator...)
  - [x] volledig en tijdig ingediend dossier


## Projectstructuur

### Web Services

alles van repo/rest/service verdeelt in mappen onder src <br/>
aparte core en data(seeds en migrations) map <br/>
test directory heeft dezelfde structuur als de src map <br/>
config files in aparte config dir
## Extra technologie
niet van toepassing
### Web Services
niet van toepassing

## Testresultaten

### Web Services
fact.spec.js (get/post/put/del) getest <br/>
likedFact.spec.js (get/del) getest <br/>
user.spec.js (get/post/del) getest 

![coverage](media/chrome_EKP3D3y4R0.png)
## Gekende bugs
### Web Services
Geen tegengekomen.
