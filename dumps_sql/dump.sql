CREATE SCHEMA hamburgueria;

use hamburgueria;

CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `senha` varchar(100) DEFAULT NULL,
  `nome` varchar(100) DEFAULT NULL,
  `celular` varchar(12) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cpf` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`idusuario`),
  UNIQUE KEY `idusuario_UNIQUE` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE `produto` (
  `idProduto` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `valor` float DEFAULT NULL,
  `imagem` longtext,
  `quantidade` int DEFAULT NULL,
  PRIMARY KEY (`idProduto`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


COMMIT;
