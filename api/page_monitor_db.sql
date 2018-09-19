-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Czas generowania: 14 Wrz 2018, 22:47
-- Wersja serwera: 5.7.22
-- Wersja PHP: 7.2.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `page_monitor_db`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `url` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Wyzwalacze `pages`
--
DELIMITER $$
CREATE TRIGGER `init_new_page_status` AFTER INSERT ON `pages` FOR EACH ROW BEGIN
	INSERT INTO `pages_status` (site_id)
 	VALUES (NEW.id);
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `pages_status`
--

CREATE TABLE `pages_status` (
  `id` int(10) UNSIGNED NOT NULL,
  `site_id` int(11) NOT NULL,
  `status_code` int(11) DEFAULT NULL,
  `last_checked` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_working_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `last_response_time` float(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `reports`
--

CREATE TABLE `reports` (
  `id` int(10) UNSIGNED NOT NULL,
  `generated_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `url` varchar(100) COLLATE utf8_polish_ci NOT NULL,
  `breakdown_from` timestamp NULL DEFAULT NULL,
  `breakdown_to` timestamp NULL DEFAULT NULL,
  `status_code` int(11) NOT NULL,
  `is_seen` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `status_codes`
--

CREATE TABLE `status_codes` (
  `status_code` smallint(6) NOT NULL DEFAULT '0',
  `short_desc` text,
  `long_desc` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Zrzut danych tabeli `status_codes`
--

INSERT INTO `status_codes` (`status_code`, `short_desc`, `long_desc`) VALUES
(-2, 'Unknown Error', 'Wystąpił nieznany błąd'),
(-1, 'DNS Server Not Found', 'Nie odnaleziono strony, problem z serwerem DNS.'),
(100, 'Continue', 'Kontynuuj – prośba o dalsze wysyłanie zapytania'),
(101, 'Switching Protocols', 'Zmiana protokołu'),
(110, 'Connection Timed Out', 'Przekroczono czas połączenia. Serwer zbyt długo nie odpowiada.'),
(111, 'Connection refused', 'Serwer odrzucił połączenie'),
(200, 'OK', 'Zawartość żądanego dokumentu (najczęściej zwracany nagłówek odpowiedzi w komunikacji WWW Internetu)'),
(201, 'Created', 'Utworzono – wysłany dokument został zapisany na serwerze'),
(202, 'Accepted', 'Przyjęto – zapytanie zostało przyjęte do obsłużenia, lecz jego zrealizowanie jeszcze się nie skończyło'),
(203, 'Non-Authoritative Information', 'Informacja nieautorytatywna – zwrócona informacja nie odpowiada dokładnie odpowiedzi pierwotnego serwera, lecz została utworzona z lokalnych bądź zewnętrznych kopii'),
(204, 'No content', 'Brak zawartości – serwer zrealizował zapytanie klienta i nie potrzebuje zwracać żadnej treści'),
(205, 'Reset Content', 'Przywróć zawartość – serwer zrealizował zapytanie i klient powinien przywrócić pierwotny wygląd dokumentu'),
(206, 'Partial Content', 'Część zawartości – serwer zrealizował tylko część zapytania typu GET, odpowiedź musi zawierać nagłówek Content-Range informujący o zakresie bajtowym zwróconego elementu'),
(300, 'Multiple Choices', 'Wiele możliwości – istnieje więcej niż jeden sposób obsłużenia danego zapytania, serwer może podać adres zasobu, który pozwala na wybór jednoznacznego zapytania spośród możliwych'),
(301, 'Moved Permanently', 'Trwale przeniesiony – żądany zasób zmienił swój URI i w przyszłości zasób powinien być szukany pod wskazanym nowym adresem'),
(302, 'Found', 'Znaleziono – żądany zasób jest chwilowo dostępny pod innym adresem a przyszłe odwołania do zasobu powinny być kierowane pod adres pierwotny'),
(303, 'See Other', 'Zobacz inne – odpowiedź na żądanie znajduje się pod innym URI i tam klient powinien się skierować. To jest właściwy sposób przekierowywania w odpowiedzi na żądanie metodą POST.'),
(304, 'Not Modified', 'Nie zmieniono – zawartość zasobu nie podległa zmianie według warunku przekazanego przez klienta (np. data ostatniej wersji zasobu pobranej przez klienta – pamięć podręczna przeglądarki)'),
(305, 'Use Proxy', 'Użyj serwera proxy – do żądanego zasobu trzeba odwołać się przez serwer proxy podany w nagłówku Location odpowiedzi'),
(306, 'Switch Proxy', 'Kod nieużywany, aczkolwiek zastrzeżony dla starszych wersji protokołu'),
(307, 'Temporary Redirect', 'Tymczasowe przekierowanie – żądany zasób znajduje się chwilowo pod innym adresem URI, odpowiedź powinna zawierać zmieniony adres zasobu, na który klient zobowiązany jest się przenieść'),
(310, 'Too many redirects', 'Zbyt wiele przekierowań.'),
(400, 'Bad Request', 'Nieprawidłowe zapytanie – żądanie nie może być obsłużone przez serwer z powodu nieprawidłowości postrzeganej jako błąd użytkownika (np. błędna składnia zapytania)'),
(401, 'Unauthorized', 'Nieautoryzowany dostęp – żądanie zasobu, który wymaga uwierzytelnienia'),
(402, 'Payment Required', 'Wymagana opłata – odpowiedź zarezerwowana na przyszłość. Google Developers API korzysta z tego kodu, jeśli dany programista przekroczył dzienny limit zapytań.'),
(403, 'Forbidden', 'Zabroniony – serwer zrozumiał zapytanie, lecz konfiguracja bezpieczeństwa zabrania mu zwrócić żądany zasób'),
(404, 'Not Found', 'Nie znaleziono – serwer nie odnalazł zasobu według podanego URL ani niczego co by wskazywało na istnienie takiego zasobu w przeszłości'),
(405, 'Method Not Allowed', 'Niedozwolona metoda – metoda zawarta w żądaniu nie jest dozwolona dla wskazanego zasobu, odpowiedź zawiera też listę dozwolonych metod'),
(406, 'Not Acceptable', 'Niedozwolone – zażądany zasób nie jest w stanie zwrócić odpowiedzi mogącej być obsłużonej przez klienta według informacji podanych w zapytaniu'),
(407, 'Proxy Authentication Required', 'Wymagane uwierzytelnienie do serwera pośredniczącego (ang. proxy) – analogicznie do kodu 401, dotyczy dostępu do serwera proxy'),
(408, 'Request Timeout', 'Koniec czasu oczekiwania na żądanie – klient nie przesłał zapytania do serwera w określonym czasie'),
(409, 'Conflict', 'Konflikt – żądanie nie może być zrealizowane, ponieważ występuje konflikt z obecnym statusem zasobu, ten kod odpowiedzi jest zwracany tylko w przypadku podejrzewania przez serwer, że klient może znaleźć przyczyny błędu i przesłać ponownie prawidłowe zapytanie. Odpowiedź serwera powinna zawierać informację umożliwiające klientowi rozwiązanie problemu, jednak nie jest to obowiązkowe.'),
(410, 'Gone', 'Zniknął (usunięto) – zażądany zasób nie jest dłużej dostępny i nieznany jest jego ewentualny nowy adres URI; klient powinien już więcej nie odwoływać się do tego zasobu'),
(411, 'Length required', 'Wymagana długość – serwer odmawia zrealizowania zapytania ze względu na brak nagłówka Content-Length w zapytaniu; klient może powtórzyć zapytanie dodając doń poprawny nagłówek długości'),
(412, 'Precondition Failed', 'Warunek wstępny nie może być spełniony – serwer nie może spełnić przynajmniej jednego z warunków zawartych w zapytaniu'),
(413, 'Request Entity Too Large', 'Encja zapytania zbyt długa – całkowita długość zapytania jest zbyt długa dla serwera'),
(414, 'Request-URI Too Long', 'Adres URI zapytania zbyt długi – długość zażądanego URI jest większa niż maksymalna oczekiwana przez serwer'),
(415, 'Unsupported Media Type', 'Nieznany sposób żądania – serwer odmawia przyjęcia zapytania, ponieważ jego składnia jest niezrozumiała dla serwera'),
(416, 'Requested Range Not Satisfiable', 'Zakres bajtowy podany w zapytaniu nie do obsłużenia – klient podał w zapytaniu zakres, który nie może być zastosowany do wskazanego zasobu'),
(417, 'Expectation Failed', 'Oczekiwana wartość nie do zwrócenia – oczekiwanie podane w nagłówku Expect żądania nie może być spełnione przez serwer lub – jeśli zapytanie realizuje serwer proxy – serwer ma dowód, że oczekiwanie nie będzie spełnione przez następny w łańcuchu serwer realizujący zapytanie'),
(451, 'Unavailable For Legal Reasons', 'Zawartość niedostępna z powodów prawnych – strona lub zasób zostały zablokowane z powodów naruszenia prawa, w tym także z powodu ocenzurowania zawartości przez władze.'),
(500, 'Internal Server Error', 'Wewnętrzny błąd serwera – serwer napotkał niespodziewane trudności, które uniemożliwiły zrealizowanie żądania'),
(501, 'Not Implemented', 'Nie zaimplementowano – serwer nie dysponuje funkcjonalnością wymaganą w zapytaniu; ten kod jest zwracany, gdy serwer otrzymał nieznany typ zapytania'),
(502, 'Bad Gateway', 'Błąd bramy – serwer – spełniający rolę bramy lub pośrednika – otrzymał niepoprawną odpowiedź od serwera nadrzędnego i nie jest w stanie zrealizować żądania klienta'),
(503, 'Service Unavailable', 'Usługa niedostępna – serwer nie jest w stanie w danej chwili zrealizować zapytania klienta ze względu na przeciążenie'),
(504, 'Gateway Timeout', 'Przekroczony czas bramy – serwer – spełniający rolę bramy lub pośrednika – nie otrzymał w ustalonym czasie odpowiedzi od wskazanego serwera HTTP, FTP, LDAP itp. lub serwer DNS jest potrzebny do obsłużenia zapytania'),
(505, 'HTTP Version Not Supported', 'Nieobsługiwana wersja HTTP – serwer nie obsługuje bądź odmawia obsługi wskazanej przez klienta wersji HTTP'),
(506, 'Variant Also Negotiates', ''),
(507, 'Insufficient Storage (WebDAV)', 'Serwer nie jest w stanie zapisać danych związanych z wykonaniem zapytania'),
(508, 'Loop Detected (WebDAV)', 'Serwer wykrył nieskończoną pętlę w trakcie przetwarzania zapytania'),
(509, 'Bandwidth Limit Exceeded', 'Serwer jest tymczasowo niedostępny, ponieważ właściciel strony przekroczył limit transferu danych.'),
(510, 'Not Extended', 'Brak rozszerzenia HTTP koniecznego do obsługi danego zapytania'),
(511, 'Network Authentication Required', 'Wymagane uwierzytelnienie przed otrzymaniem dostępu do sieci. W zamyśle wykorzystywane przez pośredników kontrolujących dostęp do sieci (np.: wymaganie potwierdzenia zasad użytkowania przed udostępnieniem połączenia).');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `mail_address` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `url` (`url`),
  ADD KEY `user_id` (`user_id`);

--
-- Indeksy dla tabeli `pages_status`
--
ALTER TABLE `pages_status`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pages_status_ibfk_1` (`site_id`);

--
-- Indeksy dla tabeli `reports`
--
ALTER TABLE `reports`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `status_codes`
--
ALTER TABLE `status_codes`
  ADD PRIMARY KEY (`status_code`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail_address` (`mail_address`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `pages_status`
--
ALTER TABLE `pages_status`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `reports`
--
ALTER TABLE `reports`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT dla tabeli `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `pages`
--
ALTER TABLE `pages`
  ADD CONSTRAINT `pages_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ograniczenia dla tabeli `pages_status`
--
ALTER TABLE `pages_status`
  ADD CONSTRAINT `pages_status_ibfk_1` FOREIGN KEY (`site_id`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
