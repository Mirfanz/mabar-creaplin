-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 14 Nov 2022 pada 15.20
-- Versi server: 10.1.38-MariaDB
-- Versi PHP: 7.3.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dbgame`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `game1`
--

CREATE TABLE `game1` (
  `id` int(11) NOT NULL,
  `link` varchar(20) NOT NULL,
  `timer` int(11) NOT NULL,
  `pcount` int(11) NOT NULL DEFAULT '0',
  `question` varchar(100) NOT NULL,
  `p1name` varchar(100) NOT NULL,
  `p2name` varchar(100) NOT NULL,
  `p3name` varchar(100) NOT NULL,
  `p1pos` int(11) NOT NULL DEFAULT '0',
  `p2pos` int(11) NOT NULL DEFAULT '0',
  `p3pos` int(11) NOT NULL DEFAULT '0',
  `p1score` int(11) NOT NULL,
  `p2score` int(11) NOT NULL,
  `p3score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data untuk tabel `game1`
--

INSERT INTO `game1` (`id`, `link`, `timer`, `pcount`, `question`, `p1name`, `p2name`, `p3name`, `p1pos`, `p2pos`, `p3pos`, `p1score`, `p2score`, `p3score`) VALUES
(1, 'mabar623a3365df464', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(2, 'mabar623a336984f1a', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(3, 'mabar623a336a58ffb', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(4, 'mabar623a336a8280b', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(5, 'mabar623a339b37d81', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(6, 'mabar623a339d1cfd4', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(7, 'mabar623b135df0611', 1648038761, 1, '0,7,3,1,9,3,3,5,1,0,0,3,4,8,6,6,9,1,2,1,8,4,4,0,0,3,2,7,8,0,5,8,4,5,4,5,5,0,5,1,8,9,7,3,2,0,2,3,0,3,', 'manusia manusai', '', '', 0, 0, 0, 0, 0, 0),
(8, 'mabar623b13e720095', 1648038979, 2, '6,4,6,6,0,9,5,6,1,2,9,3,6,1,8,9,8,5,7,3,7,9,2,9,6,4,3,8,5,9,5,3,1,2,8,9,6,9,3,8,1,2,7,6,1,2,0,2,8,5,', 'muhammad irfan', 'bfdkjbfkdjbfkd', '', 0, 16, 0, 0, 546, 0),
(9, 'mabar623b149aefd58', 1648039360, 2, '4,1,9,7,9,2,1,7,3,2,1,4,9,4,5,1,4,5,7,8,2,5,1,5,2,7,4,1,8,2,4,4,0,7,2,0,5,2,8,4,3,3,3,6,2,0,6,7,4,7,', 'kdbjsbdsd', 'dnkbfdskfsf', '', 19, 0, 0, 647, 0, 0),
(10, 'mabar623b16f38428f', 1648039701, 1, '3,7,6,7,7,7,6,7,4,1,4,4,6,7,7,7,2,7,7,4,5,4,7,0,1,9,3,4,3,7,5,4,8,8,1,8,5,6,5,1,3,7,3,9,5,0,2,7,8,6,', 'jgjgjgj', '', '', 5, 0, 0, 17, 0, 0),
(11, 'mabar623b17a2c60d3', 1648040842, 3, '6,2,6,3,2,7,6,6,6,5,4,4,2,8,5,4,3,5,5,2,7,8,8,4,4,5,1,0,8,2,0,4,6,0,9,5,0,1,0,9,4,8,4,0,1,5,8,6,6,3,', 'jgjgjgj', 'muhammad', 'mirfan', 0, 4, 3, 0, 8, 19),
(12, 'mabar623b1c0072102', 1648040981, 2, '1,2,5,2,2,9,5,0,7,6,2,8,9,3,5,2,4,5,4,7,4,3,7,1,4,1,0,5,0,9,9,1,1,5,1,5,8,4,5,7,4,6,8,7,9,8,2,5,6,7,', 'bghjv', 'lnckjbs', '', 3, 7, 0, 54, 107, 0),
(13, 'mabar623c3fb917d88', 1648115878, 2, '6,4,6,3,6,1,7,4,4,3,5,7,2,2,4,8,6,6,0,2,7,7,1,0,4,0,6,9,6,6,1,0,8,6,8,0,8,5,9,7,6,5,7,8,1,8,9,4,2,0,', 'muhammad irfan', 'kfdfkbdkfs', '', 0, 0, 0, 0, 0, 0),
(14, 'mabar623e9866b715f', 1648269425, 1, '7,7,5,5,7,7,5,5,8,7,3,2,9,2,7,3,5,9,7,3,2,0,3,0,1,2,6,0,8,8,6,2,3,3,0,6,9,9,2,4,2,1,0,5,2,4,0,6,6,0,', 'muhammad irfan', '', '', 45, 0, 0, 10978, 0, 0),
(15, 'mabar62e3f96b6baaf', 0, 0, '0,', '', '', '', 0, 0, 0, 0, 0, 0),
(16, 'mabar62f5c164d0bd5', 1660273007, 1, '1,5,7,7,7,1,4,3,7,0,0,0,3,0,6,1,6,3,8,2,9,0,4,3,1,6,0,9,3,7,1,2,3,8,3,1,9,5,1,7,1,5,5,6,3,8,3,7,6,9,', 'muhammad irfaa', '', '', 20, 0, 0, 1311, 0, 0),
(17, 'mabar6371f96a734c8', 0, 1, '0,', 'muhammad irfan', '', '', 0, 0, 0, 0, 0, 0),
(18, 'mabar6371fbc9510c6', 1668414786, 2, '8,4,7,3,1,0,7,6,7,2,4,2,9,4,3,1,9,2,9,9,9,0,8,9,3,2,0,0,1,4,9,4,0,2,5,9,8,0,5,8,7,8,2,7,6,4,7,9,1,2,', 'dimas agus k', 'mirfan wkwk', '', 29, 16, 0, 3126, 417, 0);

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `game1`
--
ALTER TABLE `game1`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `game1`
--
ALTER TABLE `game1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
