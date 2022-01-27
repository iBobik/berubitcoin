# Jak přidávat ověřená místa

Ověřená místa se načítají z YAML aouborů v adresářo [`places`](places).

## Formát souboru

- název souboru ve tvaru `mesto-nazev-mista.yml` (jen malá písmena bez diakritiky a spojovník místo mezer, bez městských částí)
- `name`: Název místa, typicky stejné jako na Google Maps.
- `googleMapsID`: ID Google Place, [dá se najít zde](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder).
- `coinMapID`:  Pokud je místo v [Coinmap.org](https://coinmap.org/view), je nutné zadat jeho ID aby se nezobrazovalo dvakrát. Je videt v URL pod Actions -> Share venue. Pokud v Coinmap není, tak pole odstraň.
- `maintainerGitHubLogin`: GitHub login správce tohoto místa. Měl by to být človek co je v kontaktu s majitelem, poskytuje mu pomoc a garantuje aktuálnost.

Můžeš použít tuto šablonu:
```
name:
googleMapsID:
coinMapID:
maintainerGitHubLogin:

```

## Schvalovací workflow

0. Předpokládáme že se v podniku [přijímá Bitcoin pomocí Lightning Network](https://www.berubitcoin.cz/)
1. [Vytvoříš soubor s místem](https://github.com/iBobik/berubitcoin/new/master/content/places)
2. V dalším kroku vytvoříš Pull Request
3. Do PR vložíš odkaz na video kde předvádíš funkční platbu v tomto podniku. Ideálně jej nasdílej na sociální sítě podniku. 🙂
4. Ulož PR a sleduj notifkace. Po kontrole jej schválíme nebo doporučíme úpravy.

# Jsi majitel podniku a nevíš si rady?
[Kontaktuj nás](https://www.berubitcoin.cz/#kontakt)
