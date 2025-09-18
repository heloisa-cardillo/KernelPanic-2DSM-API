-- ======================
-- 📌 SEED DE DADOS INICIAIS
-- ======================

-- Tabela: FunilVendas
INSERT INTO FunilVendas (funil_ID, estagio_nome) VALUES
(1, 'Prospeccao'),
(2, 'Inicial'),
(3, 'Potencial'),
(4, 'Manutencao'),
(5, 'Negociacao'),
(6, 'FollowUp'),
(7, 'Vendas'),
(8, 'NaoVendas');

-- Tabela: Funcionario
INSERT INTO Funcionario (funcionario_ID, nome, genero, endereco, numero_telefone, cargo, email, senha_hash, nivel_acesso, localizacao_funcionario, gerente_ID) VALUES
(1, 'Carlos Silva', 'Masculino', 'Rua A, 123', '11999999999', 'Gerente de Vendas', 'carlos@empresa.com', 'hashsenha1', 'admin', 'São Paulo', NULL),
(2, 'Ana Oliveira', 'Feminino', 'Rua B, 456', '11888888888', 'Vendedor', 'ana@empresa.com', 'hashsenha2', 'vendedor', 'São Paulo', 1),
(3, 'João Souza', 'Masculino', 'Rua C, 789', '11777777777', 'Consultor', 'joao@empresa.com', 'hashsenha3', 'consultor', 'Rio de Janeiro', 1);

-- Tabela: Cliente
INSERT INTO Cliente (cliente_ID, nome, endereco, funcionario_ID, funil_ID) VALUES
(1, 'Empresa Alpha', 'Av. Paulista, 1000', 2, 1),
(2, 'Empresa Beta', 'Av. Rio Branco, 200', 3, 2);

-- Tabela: ContatoCliente
INSERT INTO ContatoCliente (Contato_cliente_ID, tipo_contato, valor_contato, cliente_ID) VALUES
(1, 'email', 'contato@alpha.com', 1),
(2, 'telefone', '1133334444', 1),
(3, 'email', 'comercial@beta.com', 2);

-- Tabela: AgendamentoInteracao
INSERT INTO AgendamentoInteracao (agendamento_interacao_ID, data_marcada, tipo_interacao, status, notas, cliente_ID, funcionario_ID) VALUES
(1, '2025-09-20 10:00:00', 'Reunião', 'Agendado', 'Apresentar proposta inicial.', 1, 2),
(2, '2025-09-22 14:00:00', 'Chamada', 'Agendado', 'Retornar contato após envio de material.', 2, 3);

-- Tabela: InteracaoCliente
INSERT INTO InteracaoCliente (interacao_ID, data_interacao, tipo_interacao, relatorio_interacao, funcionario_ID, cliente_ID, agendamento_interacao_ID) VALUES
(1, '2025-09-20', 'Reunião', 'Cliente interessado, pediu revisão da proposta.', 2, 1, 1),
(2, '2025-09-22', 'Chamada', 'Cliente não atendeu, reagendado.', 3, 2, 2);

-- Tabela: HistoricoFunil
INSERT INTO HistoricoFunil (historico_ID, data_movimentacao, cliente_ID, funil_venda_ID) VALUES
(1, CURRENT_TIMESTAMP, 1, 1),
(2, CURRENT_TIMESTAMP, 2, 2);

-- Tabela: EventoTreinamento
INSERT INTO EventoTreinamento (evento_ID, titulo, descricao, data_inicio, duracao_horas, evento_link, status, organizador_ID) VALUES
(1, 'Treinamento de Vendas Consultivas', 'Curso avançado de técnicas de vendas.', '2025-09-25 09:00:00', 4, 'https://evento.com/vendas', 'Ativo', 1);

-- Tabela: FuncionariosConvidados
INSERT INTO FuncionariosConvidados (evento_ID, funcionario_ID) VALUES
(1, 2),
(1, 3);

-- Tabela: Presenca
INSERT INTO Presenca (presenca_ID, presente, razao_recusa, data_termino, link_feedback, funcionario_ID, evento_ID) VALUES
(1, TRUE, NULL, '2025-09-25 13:00:00', 'https://evento.com/feedback1', 2, 1),
(2, FALSE, 'Conflito de agenda', NULL, NULL, 3, 1);

-- Tabela: Notificacao
INSERT INTO Notificacao (notificacao_ID, titulo_notificacao, corpo_notificacao, evento_ID) VALUES
(1, 'Lembrete: Treinamento', 'Não se esqueça do treinamento agendado.', 1);

-- Tabela: NotificacaoConvidados
INSERT INTO NotificacaoConvidados (notificacao_ID, funcionario_ID, evento_ID, status_leitura, data_leitura, prioridade) VALUES
(1, 2, 1, TRUE, '2025-09-24 10:00:00', 'Alta'),
(1, 3, 1, FALSE, NULL, 'Alta');

-- Tabela: Vendas
INSERT INTO Vendas (venda_ID, data_venda, valor_total, status, cliente_ID, funcionario_ID) VALUES
(1, '2025-09-15', 5000.00, 'Fechada', 1, 2),
(2, '2025-09-16', 3200.00, 'Em negociação', 2, 3);
