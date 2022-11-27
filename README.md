# Makeup detector

## Zespół

* [Michał Wójcik](https://github.com/wojcikm11)
* [Katarzyna Grygorowicz](https://github.com/kasiagrygorowicz)
* [Marek Nowakowski](https://github.com/MarekSNowakowski)

## Cel projektu
W wielu miejscach sektora publicznego, noszenie makijażu jest niewskazane lub zabronione - przykładem są szkoły podstawowe, gdzie make-up uniemożliwia uczniom uczestniczenie w zajęciach. Sam proces rozpoznawania makijażu jest żmudny, powtarzalny i czasochłonny, gdy jest wykonywany ręcznie. Rozwiązaniem zagadnienia jest aplikacja, która ocenia prawdopodobieństwo noszenia makijażu przez osobę znajdującą się na zdjęciu. Pozwala to na uproszczenie i zautomatyzowanie procesu poprzez dostarczenie łatwego w obsłudze interfejsu użytkownika oraz sztucznej inteligencji, która dokonuje właściwej ewaluacji omawianego problemu.

## Opis projektu i funkcjonalności
### Funkcjonalności rozwiązania
- możliwość przesłania zdjęcia w aplikacji internetowej
- ocena prawdopodobieństwa widocznego makijażu lub braku makijażu na zdjęciu
- zaprezentowanie wyniku użytkownikowi w aplikacji internetowej

### Przykładowy scenariusz
Użytkownik za pomocą swojego urządzenia wykonuje zdjęcie swojej twarzy. Następnie przechodzi do aplikacji internetowej, gdzie wysyła plik w formacie obsługiwanym przez Custom Vision API. Po wysłaniu zdjęcia użytkownik po krótkim czasie otrzymuje odpowiedź, zawierające informacje czy oraz z jakim prawdopodobieństwem osoba na zdjęciu nosi makijaż. Użytkownik przesyła odpowiedź do wewnętrznego systemu instytucji, w ramach której wykonał opisany wyżej proces.

## Schemat działania
- użytkownik wykonuje zdjęcie swojej twarzy
- użytkownik uruchamia aplikację internetową, gdzie wysyła plik wykonanego zdjęcia swojej twarzy
- aplikacja internetowa wysyła zdjęcie do serwisu Custom Vision, gdzie dla danego obrazu przypisywane są trzy kategorie wraz z obliczonymi prawdopodobieństwami ich prawdziwości:
  - widoczny makijaż
  - brak makijażu
  - na zdjęciu nie znaleziono osoby
- serwis Custom Vision wysyła odpowiedź do aplikacji internetowej z obliczonymi prawdopodobieństwami
- aplikacja internetowa wybiera kategorię z największym prawdopodobieństwem i na jej podstawie wyświetla informację użytkownikowi 

## Diagram architektury

## Opis wybranych serwisów i stosu technologicznego
- React
- App Service (opcja WebApp)
- Custom Vision
- Azure Virtual Network

Deployment aplikacji internetowej został wykonany przy pomocy Visual Studio Code z zainstalowanym rozszerzeniem Azure App Service.

## Demo aplikacji
https://www.youtube.com/watch?v=y7lijrdE9co
