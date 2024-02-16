This is a [Next.js](https://nextjs.org/) project.

## Getting Started

First, run the development server:

```bash
npm install
```

```bash
npm run dev
```

# Zadanie

Celem zadania jest wykonanie poniższych punktów w projekcie opartym o framework Next.js z wykorzystaniem sugerowanych bibliotek oraz publicznie dostępnego API - The Star Wars API (https://swapi.dev/documentation).

### 1. Pobierz pliki projektu

`-`

### 2. Implementacja Paginacji w Liście

Rozszerzyć dostępną listę postaci o możliwość nawigacji pomiędzy kolejnymi stronami udostępnionymi przez API.

Dokumentacja API: https://swapi.dev/documentation#people

### 3. Implementacja Strony Indywidualnej Postaci

Dodać stronę dla pojedynczej postaci, priorytetem jest zapewnienie poprawnego linkowania.

### 4. Dodanie Formularza

Na osobnej stronie należy zamieścić formularz umożliwiający dodanie nowego statku kosmicznego (“`starship`”) poprzez przesłanie odpowiednich danych do API.

Pole “`pilot`” powinno zawierać funkcjonalność wyszukiwania (https://mui.com/material-ui/react-autocomplete/) spośród kolekcji postaci (“`people`”), wyszukując po nazwie (“`name`”).

Dodatkowo należy przesłać formularz do wewnętrznego adresu API: `/api/starship`.

Do obsługi formularza można wykorzystać bibliotekę React Hook Form.
Link do biblioteki: https://react-hook-form.com/

---

Proszę zadanie udostępnić na GitHub/GitLab i przekazać nam link na adres e-mail izabela.ratowska@diag.pl
