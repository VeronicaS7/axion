-- Seed para Engenharia e Inspeção de Soldagem

INSERT INTO public.courses (id, engineering_area_id, title, description, difficulty, estimated_hours, is_published) VALUES
('c5555555-5555-5555-5555-555555555555', 'e1111111-1111-1111-1111-111111111111', 'Engenharia e Inspeção de Soldagem', 'Curso completo baseado no Banco de Questões de Soldagem e Ensaios Não Destrutivos.', 'advanced', 40.0, true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('fbcce87f-4be9-4171-9e71-65b630584dc3', 'c5555555-5555-5555-5555-555555555555', 'Consumíveis de Soldagem', 'Questões e atividades sobre Consumíveis de Soldagem', 1, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'fbcce87f-4be9-4171-9e71-65b630584dc3', 'Prática - Consumíveis de Soldagem', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('371ae033-ec30-431b-a89c-6c74e3ea0382', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '371ae033-ec30-431b-a89c-6c74e3ea0382', 'multiple_choice', 'Foi solicitada ao fabricante de gás para soldagem a compra de um cilindro contendo a seguinte mistura gasosa: 80,0% Argônio + 15,0% CO2 + 5,0% O2. Qual composição química, abaixo informada, não pode ser aceita pelo Inspetor de Soldagem ao receber a mistura gasosa? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2572fe87-eada-4d5f-ae20-6a7f3786f373', 'b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'F) 81,5% Argônio + 13,5% CO2 + 5,0% O2', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa2505b2-71d5-4f74-8f8f-72310e26ecb2', 'b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'G) 81,5% Argônio + 13,0% CO2 + 5,5% O2', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cdbfa02a-0cbc-42a5-a829-ebc0c743e9d8', 'b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'H) 81,5% Argônio + 14,0% CO2 + 4,5% O2', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dc343e31-5f33-43a8-99cd-35603dbfc807', 'b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'I) 79,0% Argônio + 16,5% CO2 + 4,5% O2', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('79e63b1a-81a5-42f5-b8cb-2183b3af108a', 'b11faec2-d1b0-4fcd-a63d-10a7c05beb22', 'J) 80,0% Argônio + 15,5% CO2 + 4,5% O2', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3a6f0054-71dd-4b29-8fb1-b7fe35f7f093', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '3a6f0054-71dd-4b29-8fb1-b7fe35f7f093', 'multiple_choice', 'As letras B, E, ER, F e SG representam diferentes consumíveis de soldagem. Marque abaixo a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f598985f-de98-4d8a-aefa-fb08b3692281', '51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'F) B - Brasagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0469a58b-67df-4244-b192-64ccc66bf9c0', '51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'G) E - Eletrodo para soldagem a arco elétrico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('00861cb6-ba53-49fd-ab6d-5097d162af29', '51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'H) ER - Eletrodo Revestido;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c2f94471-2d65-4804-bdf3-4fff1c138db9', '51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'I) F - Fluxo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fe6eb761-b2c5-4eff-b79f-025b5c68058c', '51efb362-dcc2-4866-a3b1-dffb4e4795c0', 'J) SG - Gás de proteção.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6e7a0df7-6e8e-4182-9c18-b02ec17613d9', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 4', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('63d97c94-3a98-4d67-8334-e42e281763ec', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '6e7a0df7-6e8e-4182-9c18-b02ec17613d9', 'multiple_choice', 'Dos eletrodos revestidos apresentados abaixo, marque aquele que foi desenvolvido especificamente para ser usado na posição Vertical, progressão Descendente. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8a89cbae-a483-4034-9e00-47a8e7c77069', '63d97c94-3a98-4d67-8334-e42e281763ec', 'A) E7048', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33229e90-b85d-43e0-acb4-c2ae583fa302', '63d97c94-3a98-4d67-8334-e42e281763ec', 'B) E7028', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4e33538b-599f-4c70-acfe-81dc2be9f1d4', '63d97c94-3a98-4d67-8334-e42e281763ec', 'C) E7018', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ec299a8-d0b0-4f4b-a590-a8945b163d26', '63d97c94-3a98-4d67-8334-e42e281763ec', 'D) E6011', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aa20da3b-fd3f-4a3d-a8c6-e41afee19d72', '63d97c94-3a98-4d67-8334-e42e281763ec', 'E) E7024', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e5ab76ce-82a7-43ab-bf1f-ba1018b7913e', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 5', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'e5ab76ce-82a7-43ab-bf1f-ba1018b7913e', 'multiple_choice', 'Qual consumível de soldagem, analisando por sua classificação AWS, é indicado para ser usado no processo de soldagem oxi-acetilênica? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('551afebc-6b36-4eef-8ea0-038ca0942f61', 'fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'A) ER316MoL', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('283f8309-0575-4a5f-9a7e-6626522d8f42', 'fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'B) ER6013', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1b5586c9-5c23-4e2d-9c03-5abdbb772b88', 'fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'C) EL8', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4bc57642-653f-4319-a251-dca512a02b31', 'fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'D) SG-100', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a1e91f35-e0dc-43b0-91c4-86c783e276eb', 'fe0f88b1-df3c-4c55-9518-70feb5a3ef9f', 'E) R65', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5c31729f-2d97-48f8-a6f3-21f17af6d330', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 6', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '5c31729f-2d97-48f8-a6f3-21f17af6d330', 'multiple_choice', 'Das classificações AWS apresentadas abaixo, indique o único consumível que só pode ser usado na posição de soldagem Sobre-cabeça. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b9ee53f9-857c-46bf-9239-ca045c562157', '0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'A) ER308Si-25', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d9c46c98-88e1-4338-9c0a-4a3e414ba59d', '0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'B) E6020', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7d5d2b09-5d93-463f-9e11-35c746f2005f', '0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'C) ER80S-Ni1', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30bd4e76-1861-4d2e-9da6-e8cd76122023', '0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'D) E70T-2', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('66764ef1-bd63-4ca3-9821-deb95401ff78', '0b255732-1867-4c3d-a5da-f15f2b73f8c3', 'E) EL12K', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('33a6483d-551e-4375-8762-d967f6d17e53', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cea8b826-7978-4b3b-8156-1677f96b3223', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '33a6483d-551e-4375-8762-d967f6d17e53', 'multiple_choice', '5 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bea86f84-b075-4a09-97e8-77099732b5a5', 'cea8b826-7978-4b3b-8156-1677f96b3223', 'C) Posição de Soldagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33a74401-73e0-4c53-b69d-8be984ec2f78', 'cea8b826-7978-4b3b-8156-1677f96b3223', 'D) Tipo de Revestimento;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('294a424c-b105-4ac8-b5f2-6daf049557fb', 'cea8b826-7978-4b3b-8156-1677f96b3223', 'E) Propriedades mecânicas do metal de solda na condição de “como soldado” ou “como envelhecido”.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('59c45a62-b06c-4d00-9bf6-29166402d911', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 8', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('92904016-6f50-44ea-a016-7bac1df857f4', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '59c45a62-b06c-4d00-9bf6-29166402d911', 'multiple_choice', 'Dos diferentes tipos de revestimentos, assinale aquele que mais introduz hidrogênio no metal de solda. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ac6e7126-2241-4472-b104-00e62241e742', '92904016-6f50-44ea-a016-7bac1df857f4', 'A) Celulósico;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bfa90ced-263a-4be3-a1e3-5ef029946aa8', '92904016-6f50-44ea-a016-7bac1df857f4', 'B) Básico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7073b2d1-df21-4c07-b748-a5c67546876c', '92904016-6f50-44ea-a016-7bac1df857f4', 'C) Ácido;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('baaabb0e-fdb9-4c87-828d-28698583c809', '92904016-6f50-44ea-a016-7bac1df857f4', 'D) Rutílico;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('233c8b28-5dd9-4c3a-8650-d696cb23fa9b', '92904016-6f50-44ea-a016-7bac1df857f4', 'E) Ilmenítico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('94cb56bf-77c9-4276-a650-138c149af95f', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 9', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('34545a3c-88f4-4631-9d28-ca8ebdba922a', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '94cb56bf-77c9-4276-a650-138c149af95f', 'multiple_choice', 'De acordo com uma especificação AWS, o eletrodo revestido com classificação AWS E7018 tem o revestimento do tipo “básico” e pode ser usado com corrente contínua e com corrente alternada. Em qual das alternativas apresentadas a seguir pode-se obter essas informações? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('af27a0e3-be98-41af-a950-5b76b0417b42', '34545a3c-88f4-4631-9d28-ca8ebdba922a', 'A) E7018', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3996a8e5-da0d-4246-b296-ec73665b919d', '34545a3c-88f4-4631-9d28-ca8ebdba922a', 'B) E7018', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92029172-8706-4368-aca3-6941640ab489', '34545a3c-88f4-4631-9d28-ca8ebdba922a', 'C) E7018', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d4868e2-040e-47b4-8eb4-86f03ad60002', '34545a3c-88f4-4631-9d28-ca8ebdba922a', 'D) E7018', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d86cf037-a7b1-4ec2-a83c-5b5ece0bf02e', '34545a3c-88f4-4631-9d28-ca8ebdba922a', 'E) E7018', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6bfa5e66-1120-4fe7-a5d1-9e6328dccdea', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 10', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '6bfa5e66-1120-4fe7-a5d1-9e6328dccdea', 'multiple_choice', 'Indique, das alternativas apresentadas, qual delas não é uma função de um revestimento de um eletrodo revestido. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('19104e65-2f99-43d6-90b5-f8dd48e22000', '5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'A) Gerar gás (proteção gasosa);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20ed53d2-7375-4b53-bed0-947616f152f0', '5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'B) Produzir escória;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('57d2dfa4-b943-4b44-ac23-81db4ff5b7a7', '5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'C) Desoxidar a poça de fusão;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2dbc7b35-cf36-43a4-bfcb-096687d04732', '5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'D) Introduzir elementos de liga no metal de solda;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b75b1855-dde2-4938-a527-fec82665e4ec', '5548bf1d-1b0f-4c19-9980-cc3fd36ac95a', 'E) Evitar que o eletrodo fique colado na obra em caso de curto circuito.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('61167509-b1d8-4880-85df-0a6360143082', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 11', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '61167509-b1d8-4880-85df-0a6360143082', 'multiple_choice', 'Em relação ao revestimento do tipo Rutílico, assinale a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('29d6cfa1-7476-434f-9125-869bca4eefe0', '8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'A) É o revestimento que mais introduz hidrogênio no metal de solda', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d0ee7257-8b13-4da5-9a8b-ed240b86e8ec', '8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'B) Produz metais de solda com grande tenacidade.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ea699d2d-de56-4cc8-a944-88189afc0385', '8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'C) Tem em sua composição a presença de substâncias à base de cálcio.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c81dc50-850a-4423-9b4d-1f769c484b20', '8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'D) Em função das características elétricas do TiO2, este revestimento permite abrir e manter o arco elétrico facilmente;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('708762ff-cb3a-4508-8b1f-558d48ac8a09', '8d37cfeb-2966-4755-aba8-3ce05e6158ab', 'E) Pela geração de um forte arco elétrico, é o revestimento ideal para a soldagem do passe de raiz de tubos, oleodutos e gasodutos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('72af5ca7-c736-4d57-bb2a-cf6079585e1d', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 12', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '72af5ca7-c736-4d57-bb2a-cf6079585e1d', 'multiple_choice', 'Em relação à camada de cobre aplicada na superfície dos arames sólidos, quanto às suas finalidades, marque a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c66df5dd-a1f1-429d-ac5f-a9cc3abf5fe3', 'a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'A) Facilita o contato elétrico entre o arame sólido e o bico de contato;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0cde7e99-3a83-446b-b431-d170d4ebdbfa', 'a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'B) Protege a superfície do arame contra a corrosão atmosférica;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30183407-54ab-4925-bc69-87d334004d35', 'a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'C) Age como lubrificante durante a trefilação do arame;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('809ea4f0-762b-42f1-ab91-ef6864016d9e', 'a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'D) A fusão do arame faz introduzir grande quantidade de Cobre no metal de solda, tornando-o frágil;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a16687bd-f20e-46e7-a56d-284a17a28fde', 'a8c4dddc-5a80-4266-8a31-d36d970d6bcd', 'E) Apesar da camada de cobre se encontrar depositada sobre o arame sólido, isto não impede deste arame sólido mesmo assim esta condição satisfaz a definição de “Eletrodo Nu”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('58e61183-9fd1-4474-83e8-d74d5c56deee', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 14', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('75b07c90-dfda-4b98-815c-1ab67b6588e3', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '58e61183-9fd1-4474-83e8-d74d5c56deee', 'multiple_choice', 'Analisando a classificação AWS do consumível de soldagem E309SiL-16, marque a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('44eef1ec-e5fe-416d-8aa5-4ca831fa0c7f', '75b07c90-dfda-4b98-815c-1ab67b6588e3', 'A) É uma vareta que pode ser usada no processo TIG;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7e2975c9-1933-4f83-b3ab-ed5374eb71ae', '75b07c90-dfda-4b98-815c-1ab67b6588e3', 'B) O teor de Silício encontrado neste consumível é menor do que aquele encontrado no consumível E309-16;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('513aaf9c-42f3-4802-9446-ab8629f1799d', '75b07c90-dfda-4b98-815c-1ab67b6588e3', 'C) O teor de Carbono encontrado neste consumível é menor do que aquele encontrado no consumível E309-16;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3646bc6a-8b39-4ef5-ad7f-c956fe68381f', '75b07c90-dfda-4b98-815c-1ab67b6588e3', 'D) Este consumível só pode ser usado nas posições de soldagem plana e horizontal;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('acdde67b-95e5-4a94-ae09-d698c5566b15', '75b07c90-dfda-4b98-815c-1ab67b6588e3', 'E) As informações sobre o tipo de revestimento e os tipos de corrente e polaridade são fornecidas pelo algarismo “1”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9466349e-6b85-43f6-af7d-69390b4a942a', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 15', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('70f61f4d-ddd5-482e-a4f4-1979bc300933', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '9466349e-6b85-43f6-af7d-69390b4a942a', 'multiple_choice', 'Analisando as classificações AWS do fluxo e do arame sólido, mostradas a seguir, usados no processo de soldagem a arco submerso, assinale a alternativa correta. F7AZ – EM12K ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3721698f-ad53-4c23-8e48-18181286ad0a', '70f61f4d-ddd5-482e-a4f4-1979bc300933', 'A) As propriedades mecânicas do metal de solda foram obtidas estando a chapa de teste na condição de “como tratada”;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('200e2992-1001-4af3-b386-27601d0a29db', '70f61f4d-ddd5-482e-a4f4-1979bc300933', 'B) O ensaio de impacto foi realizado a 0ºC;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e6cdfe9f-eab9-4b14-9624-0d14d618eebb', '70f61f4d-ddd5-482e-a4f4-1979bc300933', 'C) O metal de adição é do tipo Médio Manganês;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6fac732c-c302-4527-91d6-969b8d1cd8c2', '70f61f4d-ddd5-482e-a4f4-1979bc300933', 'D) O arame sólido foi fabricado com o aço fabricado pelo método “efervescente”;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db15d684-7249-45e1-a10c-e9a3ad889968', '70f61f4d-ddd5-482e-a4f4-1979bc300933', 'E) O metal depositado, gerado pela combinação do fluxo e arame pode suportar tensões de tração entre 60.000 e 80.000 psi.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('abf5a5f8-1994-4798-946b-904e7a2c3c09', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'abf5a5f8-1994-4798-946b-904e7a2c3c09', 'multiple_choice', '8 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('94f5adcc-9747-4e7b-b9a7-2346f10b16e1', '2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'A) Os elementos químicos Cromo e Níquel, que deverão ser introduzidos no metal de solda, são provenientes da alma do consumível;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3480c105-ba08-4989-a5c1-73fd80f2ca30', '2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'B) O teor de Carbono encontrado neste consumível é maior do que aquele encontrado no consumível E316-25;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('50aa5e38-da1f-4947-985f-436184290477', '2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'C) Este consumível também é conhecido como Eletrodo “sintético”;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('61bafc42-d457-4724-9d3d-60c406dcf611', '2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'D) As informações sobre o tipo de revestimento e os tipos de corrente e polaridade são fornecidas pelos algarismos “2” e “5” (25).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('78820165-7ac2-418c-8ec7-553ae3e67592', '2ee184ba-a730-4bf2-8c91-1bdaedc88995', 'E) Este consumível é indicado especificamente para a soldagem de aços inoxidáveis.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c94289ae-847e-4a04-acec-30a35f12d309', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 17', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1f07aa47-9e85-412a-bd81-6aebf4c49416', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'c94289ae-847e-4a04-acec-30a35f12d309', 'multiple_choice', 'Qual dos fatores abaixo relacionados não serve como parâmetro para a seleção de um consumível de soldagem em uma fábrica? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a0f7d8a4-31bb-46e9-92c8-edc1eb74b3b7', '1f07aa47-9e85-412a-bd81-6aebf4c49416', 'A) Habilidade do soldador;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('edcf5c4c-6558-4c49-92fd-67c133e36c27', '1f07aa47-9e85-412a-bd81-6aebf4c49416', 'B) Tipo de fonte de energia;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21fe4e0f-24b8-4d15-9b5f-8ecbfcc66ce8', '1f07aa47-9e85-412a-bd81-6aebf4c49416', 'C) Tipo de metal de base;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e344e11-7841-40fe-b0ae-828e1969fdc1', '1f07aa47-9e85-412a-bd81-6aebf4c49416', 'D) Teor da umidade relativa do ar na região onde a fábrica se encontra;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f1a82c2b-8df3-4606-812e-31fa8d274c7d', '1f07aa47-9e85-412a-bd81-6aebf4c49416', 'E) Posição de soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4743942f-8c03-4825-88e2-5ecf84eef1c0', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 18', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e11686a4-51a2-43b9-a5da-e49413213c27', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '4743942f-8c03-4825-88e2-5ecf84eef1c0', 'multiple_choice', 'Comparando os gases Hélio (He), Argônio (Ar), CO2 e O2, usados na soldagem de metais, assinale a afirmativa verdadeira. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('146ecfea-90f3-4b0e-add0-f99e84157d3a', 'e11686a4-51a2-43b9-a5da-e49413213c27', 'F) O gás He possui um peso atômico maior do que o do Argônio;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6697d81d-3c72-4012-a139-8e42796b8796', 'e11686a4-51a2-43b9-a5da-e49413213c27', 'G) Os gases He, Ar e CO2 são considerados gases ativos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8a65820c-701d-4ded-be11-9753be32faa4', 'e11686a4-51a2-43b9-a5da-e49413213c27', 'H) O gás He, por possuir um baixo potencial de ionização, apresenta uma alta condutibilidade térmica;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e9d88e9-8e67-4f27-8462-a324c61d4154', 'e11686a4-51a2-43b9-a5da-e49413213c27', 'I) Enquanto o gás O2 pode ser usado sozinho como gás de proteção na soldagem, o gás CO2 sempre terá que ser usado acompanhado ou pelo He ou pelo Ar;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d3b17e6-9742-4e47-bf1c-d79b79838bf1', 'e11686a4-51a2-43b9-a5da-e49413213c27', 'J) O gás CO2 passa a ser oxidante apenas quando o mesmo passa pelo arco elétrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('700eaac2-a0b0-49b0-95c4-5f562c316d4c', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '700eaac2-a0b0-49b0-95c4-5f562c316d4c', 'multiple_choice', '9 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae8c83ad-83b1-43d5-be53-0977e02cf0f3', '3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'A) O consumível é recomendado para a soldagem de aços baixa-liga, alta resistência;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bd02c9ed-c6b9-4623-bc99-5e6906a75561', '3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'B) O revestimento aplicado sobre a alma é do tipo rutílico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b50e3f6f-dc22-41d7-a230-b6ad44d7e1f2', '3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'C) O limite de resistência mínimo deste consumível é de 90 MPa;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db29c847-90a9-409e-9e1c-63a51f44d2f0', '3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'D) O consumível é especialmente recomendado para ser usado na posição: vertical, progressão: descendente;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9593e461-c960-447a-8901-e219e15e7a6c', '3a60239e-a4b0-4d65-9f1c-40aaa050d841', 'E) Por pequenos teores de Cromo e Níquel em seu revestimento, este consumível é recomendado para ser usado em aços inoxidáveis.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('51b9acb8-06ba-428c-9e05-c6bbdd649a7b', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 20', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '51b9acb8-06ba-428c-9e05-c6bbdd649a7b', 'multiple_choice', 'Comparando a aplicação dos diferentes tipos de revestimento, assinale a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d16348de-0ffc-4898-85c9-a517bea854c0', '4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'A) O revestimento rutílico, por produzir metais de solda apresentando baixos teores de hidrogênio (≤ 2 ml H2/100 g de metal depositado) e uma alta tenacidade, ele é recomendado para ser usado na soldagem de vasos de pressão, jaquetas e outros equipamentos que apresentam grandes concentrações de tensões;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d96229aa-962e-48ad-8e32-c57ae824075e', '4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'B) O revestimento celulósico, por ter em sua composição grandes quantidades de TiO2, é altamente recomendado para ser usado em membros que apresentem desalinhamentos e cortes mal preparados;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65bcc109-fedb-4939-a9cd-ecb4324532ec', '4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'C) O revestimento ácido é bastante usado no Brasil, visto os altos valores de resistência mecânica e tenacidade que os metais de solda produzidos apresentam;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c5eb7f10-3912-42cf-9bfc-13df5aceb3b3', '4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'D) O revestimento básico consegue produzir metais de solda com baixíssimos teores de S, devido à presença de substâncias à base de Cálcio em sua composição;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ba8e913e-1865-434a-bf2c-e9b260ac5a26', '4de0d28c-9e91-42f6-af18-640c9d22ae8d', 'E) O revestimento celulósico, por ser altamente higroscópico, exige que o consumível seja ressecado antes de ser usado pelo soldador..', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4677a03a-d63c-47f0-8a1f-abd9fe541bf4', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 22', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bbee771f-91a7-4755-aac2-655e5eaa6e28', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '4677a03a-d63c-47f0-8a1f-abd9fe541bf4', 'multiple_choice', 'Comparando os termos “Especificação AWS” e “Classificação AWS”, assinale a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('15398826-7268-4e78-8f54-bca3020ecd05', 'bbee771f-91a7-4755-aac2-655e5eaa6e28', 'A) Todos os consumíveis de soldagem estão cobertos por uma Especificação AWS;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3363948-c141-47c9-bb89-7ba3de1a2aa7', 'bbee771f-91a7-4755-aac2-655e5eaa6e28', 'B) A Classificação AWS estabelece as condições de teste para os consumíveis a serem realizados pelo fabricante, objetivando verificar se a solda produzida apresenta as propriedades mecânicas mínimas exigidas;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4d848f04-ae9a-454f-8dc1-957de762f903', 'bbee771f-91a7-4755-aac2-655e5eaa6e28', 'C) A Especificação AWS determina de maneira exata as características de um consumível e dá garantias sobre suas propriedades;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7fb14c9c-0b45-4c8a-8bbf-6de206e9a96a', 'bbee771f-91a7-4755-aac2-655e5eaa6e28', 'D) A Classificação AWS determina que os consumíveis atendam a requisitos, como por exemplo, de fabricação, de critérios de aceitação, de embalagem, de identificação, entre outros;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e9e6fde-81d9-4c88-b451-fc288459ffef', 'bbee771f-91a7-4755-aac2-655e5eaa6e28', 'E) Nenhum requisito específico é necessário para que um consumível se enquadre em alguma Especificação AWS.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0e583368-ef74-4d6a-9490-f127d7732e7e', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 23', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '0e583368-ef74-4d6a-9490-f127d7732e7e', 'multiple_choice', 'Analisando a classificação AWS E100T1-Ni2, marque a alternativa correta, ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1f0ed328-d3c7-4f25-8c7c-c0b4a4b9f9e2', 'cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'A) E100T1-Ni2: este algarismo significa que o teste de impacto, realizada para a homologação do consumível, foi realizado a 0ºC;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b5c8c6a-74da-4eba-aa23-0216f5e16d4d', 'cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'B) E100T1-Ni2: este algarismo significa que este consumível pode ser utilizado em todas as posições de soldagem;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2dd32d9b-c4d2-40ee-bbe6-2abda3172ad7', 'cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'C) E100T1-Ni2: estes algarismos significam que este consumível resiste a uma tensão de tração no valor mínimo de 100.000 psi;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f240cd66-727e-4c85-bce4-f0efd470e8ed', 'cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'D) E100T1-Ni2: estes algarismos significam que este consumível resiste a uma tensão de tração no valor mínimo de 100.000 psi;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d794f4ad-fb8f-4163-89eb-d6adbf05e238', 'cfcdab3d-b73b-4cf3-bda8-0917363e4ef9', 'E) E100T1-Ni2: este é um consumível do tipo arame tubular desenvolvido para ser empregado na soldagem do aço carbono.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cdaa8be9-9e76-4a20-a3c4-96ffbe3abe60', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 24', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c140176f-da5b-4070-ae8f-b45602383d68', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'cdaa8be9-9e76-4a20-a3c4-96ffbe3abe60', 'multiple_choice', 'Quanto à Especificação AWS A5.18, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ec4ebfbe-c30e-4cfb-af1f-b11244eff59b', 'c140176f-da5b-4070-ae8f-b45602383d68', 'A) Comparando os consumíveis de classificações AWS ER70S-3 e ER70S-6, pode-se afirmar que a presença de teores de Mn e Si, encontrados em maiores quantidades no segundo arame, tem a finalidade principal de aumentar a resistência mecânica do metal de solda produzido por aquele arame;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('11270694-e102-4690-8f9e-9909386c2184', 'c140176f-da5b-4070-ae8f-b45602383d68', 'B) ER70S-3: o algarismo 3 na classificação apresentada designa a composição química do metal de adição;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3ded0caf-bf77-4087-9649-53596e479b38', 'c140176f-da5b-4070-ae8f-b45602383d68', 'C) Na passagem do gás de proteção CO2, proveniente do cilindro de gás, pelo interior do arco elétrico, este gás se dissocia em CO (monóxido de carbono) e Oxigênio livre;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81bc4f33-ed53-4b97-8c23-6adda1694c7a', 'c140176f-da5b-4070-ae8f-b45602383d68', 'D) A quantidade de cobre aplicada sobre o metal de adição não compromete as características mecânicas do metal de solda produzido;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f2696534-562a-41f2-b16d-082fa6b9e333', 'c140176f-da5b-4070-ae8f-b45602383d68', 'E) ER70S-3: o número 70 representa o limite de resistência, mínimo, à tração do metal depositado (70.000 psi).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b3bfcfc4-40b6-4386-acac-430391c6be63', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 25', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'b3bfcfc4-40b6-4386-acac-430391c6be63', 'multiple_choice', 'Dentre as afirmativas relacionadas aos Consumíveis de soldagem apresentadas a seguir, uma encontra-se completamente errada. Assinale-a. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d0b08cd0-b44b-40d2-b55c-e74a1530736c', '7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'A) Quando um consumível é do tipo “eletrodo revestido”, “arame tubular (com núcleo fluxado”, “arame tubular (com núcleo metálico [metal cored])”, a análise da composição química é realizada após o seu derretimento sobre uma almofada;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d5ddcfca-9235-49e0-99bd-a7a80e85ab18', '7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'B) Consumível de soldagem, por definição, é todo material empregado na soldagem  com o objetivo de depositar e proteger a poça de fusão;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d7823ec-f9c4-417b-991a-1f632f00bbed', '7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'C) O gás de proteção (mistura gasosa) tem o objetivo principal de proteger a poça de fusão da ação negativa dos gases que compõem o ar atmosférico;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a7551d02-8b2b-4047-b8d7-18fe42fcf394', '7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'D) Os arames tubulares com núcleo fluxado (flux-cored, em inglês) podem ser de dois tipos: autoprotegidos e aqueles que necessitam do uso de um gás externo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('065ac23a-39a1-4eca-ab61-ca264597f15f', '7e9909ae-ebd2-47a8-8272-1eb901ddd36d', 'E) Apesar do gás Oxigênio (O2) apresentar uma característica deletéria (ação oxidante) no interior do arco elétrico, este gás, em combinação com um gás inerte, pode ser usado como gás de proteção na soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('982bb1ee-2242-4f6f-9b79-f14e910670e7', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 26', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '982bb1ee-2242-4f6f-9b79-f14e910670e7', 'multiple_choice', 'Analisando os diferentes tipos de revestimentos dos eletrodos revestidos, marque a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fe91a2da-d8b4-4b65-8bcd-9b6b72753791', '170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'A) Dos diferentes tipos de substâncias encontradas no revestimento celulósico, é correto informar que aquela mais importante deste revestimento é o dióxido de titânio;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dc53f18d-3401-4101-a1c3-7114a2abe660', '170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'B) O óxido RuO2 é a substância mais importante encontrada no revestimento rutílico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4186431-1f5b-4123-a8da-3184815827ae', '170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'C) Substâncias como CaF2 (Fluorita), CaCO3 (Calcário), Dolomita, entre outras, são aquelas que fazem com o revestimento seja chamado de “Básico”;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae96661e-a805-4aaf-aace-1d0261efb65c', '170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'D) O revestimento Ácido possui este nome, visto que o mesmo é constituído por ácidos do tipo: Sulfúrico (H2SO4) e Carbônico (H2CO3);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed24982d-3f38-4ce7-8db7-aefcb0d39614', '170dfa6b-bbe7-4b0c-a130-dcbc71fae34c', 'E) Observando os elementos químicos que formam a Celulose (C6H10O5), conclui-se que grande parte desta substância é formada por hidrogênio. Desta forma, faz-se necessário fazer uma ressecagem deste eletrodo revestido celulósico, objetivando eliminar todo o hidrogênio nele existente.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('40afc3ad-0629-44f0-adcb-62e21b714138', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 27', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('74de1415-eb09-4da0-b44b-5b36bd08382e', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '40afc3ad-0629-44f0-adcb-62e21b714138', 'multiple_choice', 'Analisando os dois Sistemas de Classificação encontrados na Especificação A5.18, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('228850b6-c521-4c89-b468-7c170d3f6bd7', '74de1415-eb09-4da0-b44b-5b36bd08382e', 'A) O arame tubular com núcleo metálico (metal cored, em inglês) enquadrado nesta Especificação não necessita de proteção gasosa externa para a fabricação de cordões de solda;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2576612-135c-4a4b-a30c-9e979dcc87a4', '74de1415-eb09-4da0-b44b-5b36bd08382e', 'B) O consumível E70C-3M foi homologado usando uma mistura gasosa à base de 75% Argônio + 25% CO2;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0ff449a-6838-44da-b8bb-03eca311d755', '74de1415-eb09-4da0-b44b-5b36bd08382e', 'C) Pelas grandes quantidades de elementos desoxidantes encontrados na composição química do consumível de soldagem, o arame com classificação AWS ER70S-6 é indicado para ser usado com o gás CO2;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ab5fa677-c5e5-4730-b70c-e2ac5e2d70a7', '74de1415-eb09-4da0-b44b-5b36bd08382e', 'D) O consumível AWS ER70S-3 é indicado para ser usado com gás Argônio em função de sua composição química;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7792f0a0-0497-4714-8704-83b4b4199981', '74de1415-eb09-4da0-b44b-5b36bd08382e', 'E) Todos os consumíveis encontrados nesta Especificação são aptos a serem usados em todas as posições de soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0a1413f5-3127-4024-ab70-773eea52d29c', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '0a1413f5-3127-4024-ab70-773eea52d29c', 'multiple_choice', '3 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f1bef075-3ce5-473f-bb67-171d4bc88934', 'f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'A) O diâmetro de um eletrodo revestido é medido na região onde há a presença do revestimento.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('16ddcef8-0981-44ad-a540-13ca63e4adaf', 'f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'B) As embalagens do tipo lata devem ser armazenadas em pé, com a pega do eletrodo voltada para a parte inferior da embalagem;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fae4b314-1ebe-488d-a3d4-0307f396e35c', 'f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'C) No recebimento dos eletrodos revestidos, os eletrodos básicos precisam ser imediatamente armazenados em estufas, com a temperatura em torno de 150ºC;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('450820cd-4937-4a50-aac6-bbb0d6b3f387', 'f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'D) As latas, que transportam os eletrodos revestidos, são consideradas completamente estanques, não permitindo a entrada da umidade do ar em seu interior;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('51328fc7-0c77-430a-8988-4700cd3fa543', 'f28f50ae-89d2-4d3b-a16c-bf4eabd3ded1', 'E) Uma lata de eletrodos revestidos apresenta uma grande resistência, a ponto de, quando completamente fechada, é capaz de suportar, no máximo, o peso de 12 latas, uma sobre as outras, sem se danificar.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b720e98f-d19f-4604-9d85-949e08e26ca3', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 29', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'b720e98f-d19f-4604-9d85-949e08e26ca3', 'multiple_choice', 'Dos diferentes tipos de revestimentos, identifique aquele que produz cordões de solda com as maiores penetrações. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('541b5984-b359-420a-85b8-e196dd02c755', '3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'A) Básico;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ffc9701a-1a5b-4011-b5ff-748cac16b232', '3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'B) Ácido;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('831dea2f-d0d7-4af0-b84d-d17ff6b01f7d', '3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'C) Ilmenítico;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ba44cd57-9cd7-4dea-bde9-d321290c769f', '3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'D) Rutílico;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c416c267-3266-42a0-a290-9a0ebf7bbecf', '3ab1c308-3bd4-4346-85f4-fe96fbb138d5', 'E) Celulósico.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9b57f828-9f65-4aeb-a666-8458e8819e10', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 31', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '9b57f828-9f65-4aeb-a666-8458e8819e10', 'multiple_choice', 'Analisando o manuseio, armazenamento, secagem e manutenção da secagem dos consumíveis de soldagem (à exceção dos gases), pode-se afirmar que: ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1aa7f9d7-c71f-47bf-87b2-201a8823a4c0', 'cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'A) Caso a temperatura ambiente, no interior da fábrica, esteja ≥ 30ºC, isto torna desnecessário o controle da umidade relativa do ar;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9c664c14-5dc7-45c5-9e74-467691b6417e', 'cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'B) Os eletrodos revestidos básicos, por serem altamente higroscópicos, devem ser armazenados em compartimentos separados se comparados com outros tipos de revestimentos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a2e0291-efcb-44bf-b7de-1ab25871839a', 'cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'C) O compartimento, onde serão estocados todos os consumíveis de soldagem, deve ter uma temperatura 10ºC acima da temperatura ambiente (e igual ou superior a 20ºC;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7bfb13d9-e84b-4587-87dd-b1032e244bb5', 'cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'D) O compartimento, onde serão estocados todos os consumíveis de soldagem, deve ter uma umidade relativa do ar controlada de, no mínimo, 50%;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a46b46c3-c016-47d7-bf0d-b5a2f3b75658', 'cf06914f-1d14-442a-8ea8-cdf41473dfa4', 'E) Como a região sul do Brasil apresenta uma baixa umidade relativa do ar, isto faz que o Inspetor de Soldagem se preocupe apenas no controle da temperatura onde os consumíveis estão armazenados.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5962e023-b4de-4354-b67e-3358d825c720', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 32', 'Resolva a questão', 28)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '5962e023-b4de-4354-b67e-3358d825c720', 'multiple_choice', 'Analisando os consumíveis de soldagem empregados no processo de soldagem Oxi-gás, indique a seguir qual das alternativas abaixo está incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('47a1ce65-c6ec-4914-b747-419a7855817a', '8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'F) Fundente (ou fluxo);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1879818e-e3a8-43db-b33d-d718adac7da3', '8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'G) Propano (gás combustível);', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b44f935e-413e-41d9-9153-0234c2e1a270', '8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'H) Vareta;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4514e12-97a0-4d5a-a9fc-4ed61c56d98c', '8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'I) Argônio (gás inerte);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b663c664-8081-43b6-8bcc-745de31629cc', '8c83efcb-88bc-40cc-b15b-db135cfe5ddd', 'J) Oxigênio (gás comburente).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('dd302446-8e74-4a3e-8506-fb672285f7c2', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 33', 'Resolva a questão', 29)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d2245979-c7b7-4ff8-8ce3-923105487e10', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'dd302446-8e74-4a3e-8506-fb672285f7c2', 'multiple_choice', 'Existe uma grande similaridade entre os critérios de classificação relativos à Especificação AWS A5.1 e à A5.5. Identifique a seguir qual critério não é comum às duas Especificações. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c3bb58b5-fd53-4538-bc56-b3c03e188c0c', 'd2245979-c7b7-4ff8-8ce3-923105487e10', 'F) Propriedades mecânicas do metal de solda;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8dae1d44-2918-4831-af4a-f74a5b5b4672', 'd2245979-c7b7-4ff8-8ce3-923105487e10', 'G) Tipo de corrente elétrica;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f5c72ef2-5f8a-4c2b-93f7-39f715f4e7a5', 'd2245979-c7b7-4ff8-8ce3-923105487e10', 'H) Posições de soldagem;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dbfc4382-c98f-4a00-8696-2f14fa51c6f6', 'd2245979-c7b7-4ff8-8ce3-923105487e10', 'I) Composição química do metal depositado;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('05f9f702-35a3-4669-ac04-513958c98b62', 'd2245979-c7b7-4ff8-8ce3-923105487e10', 'J) Tipo de revestimento.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('72c6d626-7b9b-4569-84aa-26de4adae40b', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 34', 'Resolva a questão', 30)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c06dd728-8ec8-447c-90a0-4de35fa33f53', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '72c6d626-7b9b-4569-84aa-26de4adae40b', 'multiple_choice', 'Analise a seguinte situação: soldagem de um aço carbono (limite de resistência à tração igual a 68 ksi) pelo processo arco submerso (SAW), devendo obrigatoriamente ser tratado termicamente após a soldagem. Utilizar um arame sólido que tenha baixo teor de carbono, um teor mediano de Mn em sua composição química e que tenha sido, durante sua fabricação, acalmado pelo silício. Informa-se que a temperatura adotada no ensaio de impacto, na homologação da combinação arame-fluxo, foi de 0ºC. Com as informações fornecidas anteriormente, identifique quais classificações AWS do fluxo e arame deverão ser usados na soldagem em questão. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e35eb1a-8c86-49be-a9aa-8698104f70ee', 'c06dd728-8ec8-447c-90a0-4de35fa33f53', 'A) F7A0-EM8K', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa91a829-156b-4f72-b693-cf9a84bc9a12', 'c06dd728-8ec8-447c-90a0-4de35fa33f53', 'B) F6PZ-EM8', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3eece48e-a327-4ee5-93ea-320cb6dc9094', 'c06dd728-8ec8-447c-90a0-4de35fa33f53', 'C) F6A0-EL12', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cfefe9f6-46bd-434a-bb04-d3d82461b91e', 'c06dd728-8ec8-447c-90a0-4de35fa33f53', 'D) F7PZ-EL12K', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f266f126-737b-4edd-a3c1-b4a70ebdcdb3', 'c06dd728-8ec8-447c-90a0-4de35fa33f53', 'E) F7P0-EM8K', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9f2a4f27-dae5-4fe8-b4f6-a4a3970dab28', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 36', 'Resolva a questão', 31)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a69fd948-033b-4fe9-a4ea-4aecac2af948', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '9f2a4f27-dae5-4fe8-b4f6-a4a3970dab28', 'multiple_choice', 'Quanto ao transporte e armazenamento de Eletrodos Revestidos, identifique a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('892404f7-839e-40d9-a997-1a96154e87af', 'a69fd948-033b-4fe9-a4ea-4aecac2af948', 'A) Os cartuchos plásticos (tipo de embalagem de eletrodos) devem ser armazenados no sentido horizontal.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('889dde23-7df6-40f8-b481-597daa280c62', 'a69fd948-033b-4fe9-a4ea-4aecac2af948', 'B) As latas devem ser armazenadas na posição vertical, com as pontas de pega voltadas para cima;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a5621ff-c0c1-44a3-848a-d45ee73e9ec6', 'a69fd948-033b-4fe9-a4ea-4aecac2af948', 'C) Após as latas serem descarregadas do caminhão, proveniente do fabricante do consumível, aquelas devem ser transportadas sobre “pallets” (estrados de madeira) por meio de empilhadeiras.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3c610743-c14e-4da3-a8b2-7816aefc26f0', 'a69fd948-033b-4fe9-a4ea-4aecac2af948', 'D) Sobre cada estrado de madeira do tipo padrão é possível colocar até quatorze camadas de latas;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('54582118-3e7f-436d-85de-e815727eb5db', 'a69fd948-033b-4fe9-a4ea-4aecac2af948', 'E) Tendo em vista que as embalagens dos eletrodos revestidos são consideradas estanques, basta que as mesmas sejam acomodadas em locais com baixa umidade relativa do ar  e temperaturas superiores a 50ºC para que a validade de uso daqueles consumíveis seja prolongada por mais 3 anos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('fc8eaeeb-51ea-4e7f-a7ad-12f16eb2c1af', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 100', 'Resolva a questão', 32)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('395f78ae-930e-4f38-acdd-79c075d64262', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'fc8eaeeb-51ea-4e7f-a7ad-12f16eb2c1af', 'multiple_choice', 'm; ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('222dd257-3688-454f-9204-517cd86018cd', '395f78ae-930e-4f38-acdd-79c075d64262', 'C) A estufa destinada a secar os eletrodos e fluxos deve ser capaz de atingir 400ºC;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fd1c828-fd7b-49f0-a278-08619a246197', '395f78ae-930e-4f38-acdd-79c075d64262', 'D) A camada de eletrodos, colocados em uma estufa de manutenção da secagem, não deve ter uma altura superior a 150 mm;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4f6def79-3b98-4688-a293-598468b85bff', '395f78ae-930e-4f38-acdd-79c075d64262', 'E) Deve-se dar prioridade ao uso de estufa de formato retangular, em comparação com aquela de formato cilíndrico, visto que a primeira possui um  espaço interno maior do que a segunda, permitindo que se consiga secar uma maior quantidade de eletrodos durante um turno de trabalho.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1fcd81b1-fe7b-4594-af46-4ff0386d978d', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 1', 'Resolva a questão', 33)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5d35c079-beb2-46a3-89f1-f4a8dbe60413', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '1fcd81b1-fe7b-4594-af46-4ff0386d978d', 'multiple_choice', '8 ficam sujeitas a não serem usadas, possibilitando a contaminação do revestimento pela umidade do ar; ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f7c729d3-dcac-48e3-a6b5-923eef50f162', '5d35c079-beb2-46a3-89f1-f4a8dbe60413', 'D) O aquecimento existente no interior desta estufa se dá por meio de resistências elétricas;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bde5288c-1365-42db-bfe1-0c0055c5c839', '5d35c079-beb2-46a3-89f1-f4a8dbe60413', 'E) O soldador deve verificar constantemente se a conexão elétrica da estufa com a rede de energia se encontra em bom estado de conservação.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7a4debe3-2802-44e0-aee6-677756af76c6', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 40', 'Resolva a questão', 34)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6bfee3db-3e05-4603-aaed-105332767be1', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '7a4debe3-2802-44e0-aee6-677756af76c6', 'multiple_choice', 'Quanto às funções do revestimento dos eletrodos revestidos, marque a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0278fc01-ae9b-4969-be50-db678b64ada6', '6bfee3db-3e05-4603-aaed-105332767be1', 'A) Uma das funções elétricas do revestimento é permitir a abertura e a manutenção do arco elétrico; esta característica é produzida pela presença de substâncias como os silicatos de sódio e potássio;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b3c7dea-282c-4ae2-98a5-b7ca15918e33', '6bfee3db-3e05-4603-aaed-105332767be1', 'B) A formação de fumos mais pesados do que ar para proteger tanto as gotas sendo transferidas no interior do arco, assim como a poça de fusão, isto é uma função física do revestimento;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6230219f-b205-49bd-88fa-7e3b786f2aa7', '6bfee3db-3e05-4603-aaed-105332767be1', 'C) Uma das funções elétricas do revestimento é apresentar uma excelente condutibilidade elétrica;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f77eb04a-1cb5-46ac-84be-9e0906248d21', '6bfee3db-3e05-4603-aaed-105332767be1', 'D) Introduzir elementos químicos que refinam a estrutura do metal depositado é uma função metalúrgica do revestimento;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83791e21-4209-4ac6-8445-79a9c6a8d91c', '6bfee3db-3e05-4603-aaed-105332767be1', 'E) Uma função física do revestimento é a produção de escória durante a soldagem, que tem uma ação tanto na fase líquida do metal, quanto na fase quando o metal de solda já se encontra solidificado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e56f6e34-1a77-47b1-9abc-420b683946ec', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 41', 'Resolva a questão', 35)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f1d4961d-df55-4614-8812-30a5f35dc17a', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'e56f6e34-1a77-47b1-9abc-420b683946ec', 'multiple_choice', 'Dos diferentes tipos de consumíveis de soldagem empregados na soldagem de aços carbono pelo processo a arco submerso (SAW), identifique a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ea0e99fb-81dc-45fc-b095-f9486d2722a3', 'f1d4961d-df55-4614-8812-30a5f35dc17a', 'F) Arame sólido;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9f03f6a6-180e-471a-b5c0-84afde59b430', 'f1d4961d-df55-4614-8812-30a5f35dc17a', 'G) Arame tubular com núcleo metálico, do inglês “metal cored”;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cf2c9107-2d09-4f4f-83c9-222b48dbf770', 'f1d4961d-df55-4614-8812-30a5f35dc17a', 'H) Fluxo;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a30a8443-3072-4578-8eb7-f5f1737e3701', 'f1d4961d-df55-4614-8812-30a5f35dc17a', 'I) Fita metálica;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9cba5779-11c6-4fb9-bbca-f8e45390ccb9', 'f1d4961d-df55-4614-8812-30a5f35dc17a', 'J) Eletrodo composto ou, do inglês, “composite electrode” (similar ao arame tubular, porém desenvolvido especificamente para o processo a arco submerso).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9f97eee2-774f-49a1-a871-0ca59cbc24f0', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 42', 'Resolva a questão', 36)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '9f97eee2-774f-49a1-a871-0ca59cbc24f0', 'multiple_choice', 'Em relação aos fluxos empregados no processo de soldagem a arco submerso (SAW), marque a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('36bdbadf-3c40-4c96-8d07-bf59e0b65a95', '346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'A) Os fluxos, quanto às suas características químicas, podem ser do tipo “ácidos”, “neutros” ou “básicos”;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('36b89f32-f25f-405c-98c0-745a06404057', '346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'B) Quanto à sua capacidade de alterar a composição química do metal de solda, os fluxos podem ser classificados como “ativos” ou “neutros”;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46f512ee-bd92-450a-bcf6-a9047878c0cd', '346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'C) Independentemente da forma como os diferentes tipos de fluxos são produzidos, ou seja, se são do tipo “fundidos” ou “aglomerados”, os fluxos apresentam a grande vantagem de não absorverem a umidade do ambiente, evitando desta forma a contaminação do metal de solda pelo hidrogênio;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48749519-5cdf-4d64-9d42-8fdeb03941dd', '346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'D) Os fluxos do tipo “básico”, assim como os eletrodos revestidos básicos, são altamente higroscópicos, sendo imprescindível sua ressecagem anteriormente ao seu uso;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0f2ac287-2f53-433b-a7f4-470c529f5f2c', '346db8b7-5fe7-4f3f-b495-62f65e0d7780', 'E) Na composição química de alguns tipos de fluxos, é possível de, além de encontrar elementos químicos, cuja função principal é de aumentar a resistência mecânica e a tenacidade do metal de solda, é possível também encontrar a presença do elemento Ferro, cujo objetivo principal é aumentar a produtividade do trabalho (taxa de deposição).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('68a4d7bd-07c0-42d0-90d1-0655bdc10a2d', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 43', 'Resolva a questão', 37)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '68a4d7bd-07c0-42d0-90d1-0655bdc10a2d', 'multiple_choice', 'Os eletrodos revestidos com classificações AWS E7024, E7018 e E7028 possuem uma determinada quantidade de pó de Ferro em seus revestimentos. Esta adição deste material faz aumentar o rendimento desses consumíveis. Através dessas informações, marque a alternativa que melhor define “Rendimento do Eletrodo Revestido” ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88db3755-c188-4108-b254-fed85b4f0bc1', 'ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'A) É a relação entre o peso do eletrodo revestido e o peso do metal depositado;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8445179b-1557-4cb5-b603-2cfdae952703', 'ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'B) É a relação entre o peso do metal depositado e o peso do eletrodo revestido;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f571820f-4ed7-4216-a2e7-81945ee48a7e', 'ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'C) É a relação entre o peso da alma do eletrodo revestido e o peso do metal depositado;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('95dd6978-b051-412b-954b-e65ecdfe0846', 'ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'D) É a relação entre o peso do metal depositado e o peso do metal de solda;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fc0f5023-920b-49d4-85f5-eba14700cdc1', 'ac7581e3-03f1-4f93-9f55-bb4a63d8a9e6', 'E) É a relação entre o peso do metal depositado e o peso da alma do eletrodo revestido.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8576e6f7-e2d8-4457-9b7b-7aac6609e385', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 44', 'Resolva a questão', 38)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '8576e6f7-e2d8-4457-9b7b-7aac6609e385', 'multiple_choice', 'Foi feita uma comparação entre o valor da perna de uma solda em ângulo informado em um determinado desenho de fabricação e o valor da perna real medida na própria obra. O valor da perna informado no desenho era de 5 mm, enquanto o valor da perna real (medida) foi de 8 mm. Estes valores mostram que houve um grande desperdício na execução desta tarefa. Calcule o percentual de aumento da produção de uma solda em ângulo entre as pernas teórica e real. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('13f348fe-b57c-436f-a7d4-8c0207463fa5', '5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'A) 3%', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('284bba09-1028-4369-9f6e-80cdcda63b84', '5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'B) 60%', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b9792f5-5c5c-411b-8329-99e6561af1ab', '5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'C) 30%', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ce5d6ddd-afeb-4bb1-925e-bf997a59eb5f', '5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'D) 100%', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('587e51fd-6828-4819-93b1-93b62602f8a8', '5f5444ad-b3e4-4737-80d4-6bcc716da1bc', 'E) 256%', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bb077249-018d-4038-a7f5-1326795dadae', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 45', 'Resolva a questão', 39)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('aa13d423-be8c-43cb-bd94-834fa83eeb03', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'bb077249-018d-4038-a7f5-1326795dadae', 'multiple_choice', 'O eletrodo revestido é considerado o consumível de menor eficiência de deposição entre todos aqueles utilizados na indústria. A seguir são apresentados os motivos que justificam esta afirmação. Marque a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7052f5b6-8072-4362-9ef7-8194e2b7390a', 'aa13d423-be8c-43cb-bd94-834fa83eeb03', 'F) Queima do revestimento;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c581cafc-8758-4743-8e79-c3db8e089150', 'aa13d423-be8c-43cb-bd94-834fa83eeb03', 'G) Produção de respingos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1b26bc91-2a7c-4914-a39c-25e4e95777ef', 'aa13d423-be8c-43cb-bd94-834fa83eeb03', 'H) Volatilização de uma parte dos metais encontrados tanto na alma quanto no revestimento;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a0a73f84-9b9c-4d93-b7ba-38e577b020c9', 'aa13d423-be8c-43cb-bd94-834fa83eeb03', 'I) Umidade absorvida pelo revestimento do eletrodo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ca9c5ca1-f8e5-445a-905c-5f59b36438d4', 'aa13d423-be8c-43cb-bd94-834fa83eeb03', 'J) Pega da ponta.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4c39020b-5f64-4838-a784-be747a7ea055', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', 'activity', 'Questão 46', 'Resolva a questão', 40)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('270cffac-65c5-472c-9e86-2421b5cadc6f', 'c1eaa9df-b0ac-4f64-b4ae-b1f6baca6a21', '4c39020b-5f64-4838-a784-be747a7ea055', 'multiple_choice', 'De onde provém os principais elementos químicos encontrados no metal depositado produzido por um eletrodo revestido pertencente à Especificação AWS A5.5? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('349bf4b0-6622-42ce-856b-6d5471232796', '270cffac-65c5-472c-9e86-2421b5cadc6f', 'A) Da alma do eletrodo;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('922bd06b-a667-415d-ba21-1e8f0ea887b9', '270cffac-65c5-472c-9e86-2421b5cadc6f', 'B) Da alma e do revestimento do eletrodo;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c5e35bdb-cf6c-43c0-902d-4db77f25b8e2', '270cffac-65c5-472c-9e86-2421b5cadc6f', 'C) Do revestimento do eletrodo;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ba6c0ca-5f3e-4b23-a919-19934bf028c4', '270cffac-65c5-472c-9e86-2421b5cadc6f', 'D) Do fluxo depositado sobre o arco elétrico;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fc7d3767-2901-470f-932d-b11693218198', '270cffac-65c5-472c-9e86-2421b5cadc6f', 'E) Do revestimento do eletrodo e do fluxo depositado sobre o arco elétrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('733f6b34-7fdc-49fb-a29a-d6e36e6d6945', 'c5555555-5555-5555-5555-555555555555', 'Qualificações', 'Questões e atividades sobre Qualificações', 2, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('c500b41d-05b0-4894-9864-ef060c2b5a57', '733f6b34-7fdc-49fb-a29a-d6e36e6d6945', 'Prática - Qualificações', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0c9023c8-0618-45ac-a578-c58c267c3201', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '0c9023c8-0618-45ac-a578-c58c267c3201', 'multiple_choice', 'Quanto às qualificações de procedimentos de soldagem e as normas que regem esta atividade, marque a afirmativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('27020a3d-ab20-4647-ad15-c66e27dbf454', '1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'F) A qualificação do procedimento de soldagem é o método através do qual um procedimento particular é provado ser adequado, para produzir juntas soldadas de qualidade satisfatória.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('696f058d-85bf-4310-9c1f-2032e86b57b5', '1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'G) As qualificações de procedimento de soldagem são feitas pela avaliação dos resultados de ensaios efetuados nos corpos de prova extraídos das peças de teste, soldados de acordo com um procedimento previamente estabelecido.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('15faeb7f-66ff-4e2e-b670-4fd3a7446b0e', '1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'H) De um modo geral, a necessidade de se qualificar procedimentos de soldagem e qualificar soldadores torna-se totalmente desnecessária, quando o metal a ser soldado é o aço carbono.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9796749f-767b-4b7e-ba4a-04e4493e4a16', '1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'I) A retirada de corpos de prova de uma chapa de teste deve seguir uma orientação estabelecida pela norma de qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('918b995f-033a-40c2-a52a-b8f2520fab06', '1f7cc6e4-e558-4cee-90f7-ff0dbb327f49', 'J) O momento em que os corpos de prova são retirados das peças de teste e identificados deve ser testemunhado por um Inspetor de Soldagem Nível 2.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ead5e1f1-5ed0-490e-93bd-4dc59abc8cca', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('20fa080a-ca13-4711-917a-1cafddee5718', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'ead5e1f1-5ed0-490e-93bd-4dc59abc8cca', 'multiple_choice', 'Quanto às Variáveis conhecidas como: “Não-Essenciais”, “Essenciais” e “Essenciais Suplementares”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e54879d-66c6-45fd-89e3-a187753a2e5a', '20fa080a-ca13-4711-917a-1cafddee5718', 'A) Cada Norma de Qualificação estabelece as suas próprias Variáveis “Não-Essenciais”, “Essenciais” e “Essenciais Suplementares”, de acordo com o tipo de equipamento que a norma de projeto, que está a ela vinculada, abrange.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8a05c649-2078-4fb4-a422-f0cdcfbdbc1a', '20fa080a-ca13-4711-917a-1cafddee5718', 'B) “Variáveis Essenciais” são variáveis que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('08f15719-acdf-41ea-9aca-6fefd0000f8a', '20fa080a-ca13-4711-917a-1cafddee5718', 'C) “Variáveis Essenciais Suplementares” são aquelas que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação; contudo, a sua análise é necessária quando se tem requisito de impacto na junta soldada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fff5f90-bae7-487d-be0c-6b8be5f12e99', '20fa080a-ca13-4711-917a-1cafddee5718', 'D) “Variáveis Não-Essenciais” são variáveis que, se alteradas, não requerem uma nova qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8653b021-2e6d-4406-bfb3-730e3dec0b8b', '20fa080a-ca13-4711-917a-1cafddee5718', 'E) “Variáveis Essenciais Suplementares” são aquelas que, se alteradas além do que as normas estabelecem, requerem uma nova qualificação.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6cdca302-8504-4040-85d9-68895d48c4de', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a51cc89f-8588-4eff-8b96-f253cc1665fd', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '6cdca302-8504-4040-85d9-68895d48c4de', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não é considerada uma norma (ou código) de projeto? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9763f071-dc1f-4ea4-9fa6-5447443457a5', 'a51cc89f-8588-4eff-8b96-f253cc1665fd', 'F) ASME Seção VIII – Divisão 1', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('60236c4c-6f7f-4cc8-9996-d75e2accc944', 'a51cc89f-8588-4eff-8b96-f253cc1665fd', 'G) API 1104', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b79645e-c02d-4456-a34f-becda562f3fe', 'a51cc89f-8588-4eff-8b96-f253cc1665fd', 'H) AWS D1,1', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4411e7ec-1112-49db-9814-25bc77976f07', 'a51cc89f-8588-4eff-8b96-f253cc1665fd', 'I) ASME B31.4', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ecc243c3-a02d-47c4-aa62-9210c8dab31c', 'a51cc89f-8588-4eff-8b96-f253cc1665fd', 'J) ASME Seção I', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6f6fb2e4-3714-46a7-a132-b19ca5525307', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ec70ca6a-6d85-429c-bba2-af38d0a64182', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '6f6fb2e4-3714-46a7-a132-b19ca5525307', 'multiple_choice', 'Qual das alternativas apresentadas a seguir é considerada uma norma (ou código) de projeto? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ba4a08b5-b93b-4344-8956-66db3e2a10f6', 'ec70ca6a-6d85-429c-bba2-af38d0a64182', 'A) ASME Seção I', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('57f95f19-01fa-44dd-8e22-00482f33740a', 'ec70ca6a-6d85-429c-bba2-af38d0a64182', 'B) ASME Seção IX', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('152556c5-161f-443d-be58-8ac644c64422', 'ec70ca6a-6d85-429c-bba2-af38d0a64182', 'C) ASTM A36', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('404abc8e-f7bc-48ff-b392-6a1f84762a8d', 'ec70ca6a-6d85-429c-bba2-af38d0a64182', 'D) API 1104', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('607ca5ab-0530-4e3e-b3e3-cc4034925afd', 'ec70ca6a-6d85-429c-bba2-af38d0a64182', 'E) AISI 316', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e0d71774-1e4c-4500-8f9e-0eaffdb7c8bb', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'e0d71774-1e4c-4500-8f9e-0eaffdb7c8bb', 'multiple_choice', 'Qual das normas apresentadas a seguir contempla em seu próprio corpo: critérios, regras, recomendações técnicas quanto ao projeto de fabricação de equipamentos, assim como o código para as qualificações de procedimento de soldagem, de soldadores e operadores de soldagem? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('783a92aa-0aeb-46f3-8766-e087f8c59ed8', '0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'A) ASME Seção III', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb6ffcb7-3225-46ee-ac00-d9180fe96933', '0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'B) ASME Seção IX', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e422be65-41fb-45b3-93c6-519b9bbfe426', '0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'C) API 620', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aecb8aa2-5c0f-47aa-a0f4-52e4e6f2ce96', '0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'D) AWS D1.1', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cf81a0ab-a099-4dc9-ace5-4165c18b9cc4', '0e1101d8-a331-4ea5-bea6-ac473c944bb7', 'E) API 5L', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f7768cb9-14af-4286-ab64-1c1998035713', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 1', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ebee4388-c228-4be7-86e0-9cbf1d8dbd4c', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'f7768cb9-14af-4286-ab64-1c1998035713', 'multiple_choice', '4 ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('307d2343-c823-41c4-9ea0-1996d3e11e26', 'ebee4388-c228-4be7-86e0-9cbf1d8dbd4c', 'D) Agrupamento dos metais de adição contemplado no código API 1104, baseado nas propriedades mecânicas e composição química do metal depositado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aeebd17f-4658-42a6-8f0d-3c85617f4e8f', 'ebee4388-c228-4be7-86e0-9cbf1d8dbd4c', 'E) Agrupamento dos metais de base contemplado no código ASME, baseado nas propriedades mecânicas, composição química e soldabilidade do material.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9e1c3ffc-c1fa-404a-88e9-210f05662c00', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 1104', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('aa138e65-a3cc-4da8-8943-cb974537083a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '9e1c3ffc-c1fa-404a-88e9-210f05662c00', 'multiple_choice', 'baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40caffe9-aacf-41dd-82d7-d29b9c997bcb', 'aa138e65-a3cc-4da8-8943-cb974537083a', 'B) Agrupamento dos metais de adição contemplado no código ASME, baseado em suas propriedades mecânicas, composição química e usabilidade.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae6f899c-69c2-44ba-901e-8eebfbd9ef04', 'aa138e65-a3cc-4da8-8943-cb974537083a', 'C) Agrupamento dos consumíveis de soldagem contemplado no código AWS D1.1, baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('360ee7bf-196f-4e55-9ce6-6e8e18f9a1ca', 'aa138e65-a3cc-4da8-8943-cb974537083a', 'D) Agrupamento dos metais de adição contemplado no código API 1104, baseado em suas propriedades mecânicas, composição química e usabilidade.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('367dba0b-801e-4269-b3c2-e2d976f9c39c', 'aa138e65-a3cc-4da8-8943-cb974537083a', 'E) Agrupamento dos consumíveis de soldagem contemplado no código ASME, baseado nas propriedades mecânicas, composição química e soldabilidade do metal depositado.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('74181ff8-f4b1-4bf0-a3a8-2ca6160ff214', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 9', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '74181ff8-f4b1-4bf0-a3a8-2ca6160ff214', 'multiple_choice', 'Quanto ao tema “chapa de teste de produção”, identifique a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33c01e51-7aaf-4096-a6e1-70cf0be146b0', 'bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'A) É estabelecido que basta a soldagem de uma única chapa de teste de produção para cada tipo de equipamento, devendo esta chapa estar sempre posicionada na posição plana (posição mais comum encontrada nos equipamentos).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67f02840-8b83-44fc-9cc7-d057e311e9c0', 'bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'B) Os parâmetros usados na soldagem da chapa de teste de produção não precisa ser necessariamente os mesmos que aqueles usados na soldagem do equipamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('790f0cd8-a819-43ae-a606-6e3f68a9bb42', 'bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'C) A norma de qualificação de procedimentos de soldagem (relativa ao tipo de equipamento que está sendo fabricado) é a que contém os requisitos relativos às chapas de teste de produção.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('84d85271-5122-43a5-8677-030cee6c6cb2', 'bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'D) O uso da chapa de teste de produção é uma prática típica quando da fabricação de equipamentos que usam materiais para baixas temperaturas, quando qualquer alteração nos valores de corrente, tensão e velocidade de soldagem durante a soldagem podem aumentar o risco de fratura frágil deste equipamento.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e90d0a2-3cf6-4cb8-8035-6c96d328c004', 'bfc50f47-0bcc-4e9d-94ea-73489ac37ee2', 'E) O único ensaio mecânico realizada nas chapas de teste de produção é o de impacto. Os demais ensaios são dispensados de serem solicitados, haja vista que o ensaio de impacto é o mais importante de todos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0966b54b-5c74-4634-88f9-d90789cb45b4', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 10', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c8433252-3606-4810-89f8-539002f28274', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '0966b54b-5c74-4634-88f9-d90789cb45b4', 'multiple_choice', 'Quanto à validade da qualificação de um procedimento de soldagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bac9e0e4-499b-4d3c-8ca4-51c9b916ccbd', 'c8433252-3606-4810-89f8-539002f28274', 'A) Cada norma de qualificação de procedimento de soldagem adota seu próprio critério para impedir o uso de uma determinada especificação e solicitar uma requalificação.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1e9c5f81-7930-4661-beb2-4ddb7b47635c', 'c8433252-3606-4810-89f8-539002f28274', 'B) Nenhum ponteamento pode ser realizado, na fixação de componentes de uma junta, sem que um procedimento de soldagem adequado tenha sido qualificado previamente.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff67ecc9-4172-4370-acee-d10988c17e27', 'c8433252-3606-4810-89f8-539002f28274', 'C) Todas as normas de qualificação de procedimento de soldagem adotam o mesmo critério, quanto à sua validade.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef2d199e-819a-4ad8-bfb1-ec0cb39320ca', 'c8433252-3606-4810-89f8-539002f28274', 'D) Cada norma de qualificação de procedimento de soldagem adota os limites de suas variáveis, em função do tipo de equipamento que está sendo construído, que, por sua vez, é em função da norma de projeto.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('07f9bd4c-43a3-4063-a9ed-617a5b20f70e', 'c8433252-3606-4810-89f8-539002f28274', 'E) Nenhuma soldagem pode ser executada, na fabricação de um determinado equipamento, sem que um procedimento de soldagem adequado tenha sido qualificado previamente.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5dc668c6-c66b-4b9b-ac3e-0501a6a42f3e', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 11', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '5dc668c6-c66b-4b9b-ac3e-0501a6a42f3e', 'multiple_choice', 'Quanto à validade da qualificação de um procedimento de soldagem, assinale a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1fd97e55-b96c-4d15-b919-18ffa31ebd06', '7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'A) Os limites das qualificações de procedimento de soldagem são estabelecidos, principalmente, em função da habilidade do soldador que deverá estar preparado para participar da soldagem de um equipamento, estando este coberto por aquelas qualificações.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6376990d-0777-4ce9-9243-8d9a2c8ef12b', '7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'B) Os limites das qualificações de procedimento de soldagem são estabelecidos em função soldabilidade do metal de base que será soldado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('32b2f257-c59c-41b1-8cdf-77165ef9eaa8', '7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'C) Estabelecer que uma variável é do tipo “essencial” e uma outra é do tipo “não essencial”, isto só passa a ter valor, quando o ensaio de impacto é exigido na qualificação de um procedimento de soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7eb0cf18-8b94-4d03-bbe5-4640cbb1699c', '7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'D) Tendo em vista que cada processo de soldagem tem as suas particularidades, as principais normas de qualificação fixam, igualmente, os mesmos limites para cada variável em função do processo.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1cf868b2-68e0-4f63-ab5f-c7fbab2f4493', '7eaf0eed-a6cd-4eac-a6a8-4d36fc48d075', 'E) Enquanto algumas normas de qualificação estabelecem a mesma importância para todas as variáveis de soldagem, outras normas estabelecem níveis diferentes para essas variáveis, dando para umas um grau de importância maior e para outras um grau de importância menor.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7f1a8597-62f1-4071-817e-ab6a704b61ab', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 13', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '7f1a8597-62f1-4071-817e-ab6a704b61ab', 'multiple_choice', 'No que diz respeito a um procedimento de soldagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d2a97659-be87-4804-b2d3-382b858385d7', '83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'A) É um documento que informa, quais são as variáveis de soldagem que deverão ser empregadas na união de componentes por soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b5d81180-1117-48b8-b047-6aa1ef89984a', '83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'B) É um documento que estabelece os limites ou faixas de parâmetros, como por exemplo: tipo de corrente, de metal de base, consumíveis de soldagem, valores das intensidades de corrente elétrica, de tensão, entre outras informações.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f415bd0a-ca5a-4585-a967-17ffb6acb0b9', '83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'C) Um procedimento de soldagem só é válido dentro dos limites nele especificados.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd5d2fb0-b460-45e9-8d82-986adce7e9c5', '83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'D) Os limites ou faixas dos parâmetros de soldagem contemplados em um procedimento de soldagem são estabelecidos pela norma de projeto do equipamento.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('07d76806-adc6-4562-a075-0e5e2321ee26', '83f04c0d-c2cd-4b68-9966-9111a2cf1447', 'E) Em uma determinada situação, quando uma determinada variável de soldagem encontra-se fora do limite ou da faixa estabelecida no procedimento de soldagem, um novo procedimento de soldagem deverá ser usado em lugar do primeiro.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7f0e98db-f383-4d49-9bf7-c7bb93f610b6', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 14', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('615ee86e-6705-43de-9d75-f50bae7e0c9b', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '7f0e98db-f383-4d49-9bf7-c7bb93f610b6', 'multiple_choice', 'Assinale a alternativa incorreta no tocante aos procedimentos de soldagem pré-qualificados. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8adbf588-2ce1-4ffb-9d0a-562a84f97150', '615ee86e-6705-43de-9d75-f50bae7e0c9b', 'A) Todas as normas de qualificação disponibilizam um determinado número de procedimentos de soldagem pré-qualificados.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('435a42c3-eff6-4fdb-9636-24029294f5b6', '615ee86e-6705-43de-9d75-f50bae7e0c9b', 'B) O procedimento de soldagem pré-qualificado só é usado quando for permitido pela norma de qualificação de procedimentos, especificações, normas de fabricação, etc.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a31ee4aa-8e4e-49c1-8bbd-242a852b3bf6', '615ee86e-6705-43de-9d75-f50bae7e0c9b', 'C) Procedimentos de soldagem pré-qualificados são procedimentos de soldagem que podem ser usados quando um fabricante mostra que possui experiência no emprego de certos metais de base e consumíveis de soldagem através de serviços anteriormente executados.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('80927cd0-e521-44f0-a444-085be26e6123', '615ee86e-6705-43de-9d75-f50bae7e0c9b', 'D) Fica totalmente dispensada a realização de ensaios mecânicos, quando da decisão do uso de procedimentos de soldagem pré-qualificados.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ca4c855b-23c4-45e0-bc2d-cc74e69e8895', '615ee86e-6705-43de-9d75-f50bae7e0c9b', 'E) O impedimento do uso de um procedimento de soldagem pré-qualificado obriga o fabricante a qualificar o procedimento de soldagem por intermédio de ensaios visual, mecânicos, radiográfico, cujos resultados devem ser avaliados, conforme os critérios estabelecidos pela norma de qualificação adotada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ee7c4203-4ec3-47f9-ab78-10ace22035bf', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 15', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f508b363-24a1-4073-b316-c0c73af61329', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'ee7c4203-4ec3-47f9-ab78-10ace22035bf', 'multiple_choice', 'Em uma caldeiraria, onde esteja sendo prevista a construção de um vaso de pressão segundo as exigências da norma ASME Seção VIII Divisão 2, pergunta-se: qual seria a norma de qualificação de procedimentos de soldagem e de soldadores indicada para conduzir esta atividade? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3c7a4d52-28bf-4b08-9e96-5a5376732f6f', 'f508b363-24a1-4073-b316-c0c73af61329', 'A) ASME Seção III', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7f5c1a26-937a-4d9c-acfa-b6943a18f774', 'f508b363-24a1-4073-b316-c0c73af61329', 'B) ASME Seção VIII Divisão 1', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('127f1eee-2f98-4f82-be26-f2b9a72af7ed', 'f508b363-24a1-4073-b316-c0c73af61329', 'C) ASME Seção IX', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('76bced87-d09a-41ed-bcd4-0ca4dbc6da89', 'f508b363-24a1-4073-b316-c0c73af61329', 'D) API 1104', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b59d2e72-0407-46c5-ba0c-39674547194e', 'f508b363-24a1-4073-b316-c0c73af61329', 'E) DNV OS-103', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('67b023a4-7dcd-4684-9aff-a6db67ef653f', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 16', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a82f5b03-af0c-4865-85a1-e87504dc46f9', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '67b023a4-7dcd-4684-9aff-a6db67ef653f', 'multiple_choice', 'Durante a qualificação de um procedimento de soldagem, qual o único ensaio que não pode ser testemunhado pelo Inspetor de Soldagem Nível 1? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7645a076-3a0e-4d44-bd21-d6f45840c14d', 'a82f5b03-af0c-4865-85a1-e87504dc46f9', 'A) Ensaio de impacto.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd2a2f8d-7f9b-42ef-b7ea-efe723db9bd6', 'a82f5b03-af0c-4865-85a1-e87504dc46f9', 'B) Ensaio de dobramento lateral.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e37f711-41cd-4d4a-a5f1-2ea5f0543935', 'a82f5b03-af0c-4865-85a1-e87504dc46f9', 'C) Ensaio de dureza.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1e6b9745-a8bc-4821-8340-05e05feccda7', 'a82f5b03-af0c-4865-85a1-e87504dc46f9', 'D) Ensaio de tração.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6bca49a9-dc7f-4c39-86a7-a20cd43afdfc', 'a82f5b03-af0c-4865-85a1-e87504dc46f9', 'E) Ensaio de dobramento de face.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a4e6544a-4629-46e0-9fa4-c64b2c889ced', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 17', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'a4e6544a-4629-46e0-9fa4-c64b2c889ced', 'multiple_choice', 'Em uma fábrica, onde esteja sendo prevista a construção de um gasoduto com 254 mm de diâmetro e 5 km de comprimento, pergunta-se: qual seria a norma de qualificação (procedimentos de soldagem, e de soldadores e operadores de soldagem) indicada para conduzir esta atividade? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d75c8f4e-7a3d-47a1-8e92-50c359c71eda', '16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'A) API 5L.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d2b4155a-8509-4cc5-9c84-1a06cc59f7f4', '16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'B) API 620.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0dab1bfc-dd5a-4c84-bfa2-cb63d995afa7', '16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'C) API 650.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb8bb8d4-c416-414c-ad93-10e413eb8bb5', '16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'D) API X60.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0370a846-2063-4ebb-b51c-de98c783f16f', '16be3cb1-c99f-43bf-afc3-c1cf64c95142', 'E) API 1104.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ca32144a-4e12-4032-acc1-70dfae83322f', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 19', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'ca32144a-4e12-4032-acc1-70dfae83322f', 'multiple_choice', 'Qual norma de qualificação (de procedimento de soldagem e de soldadores e operadores de soldagem) estabeleceu as letras G (do inglês “groove”) e F (do inglês “fillet”) designando posições de soldagem para as juntas de topo e de ângulo, respectivamente?  (Exemplo: 2G, 5G, 1F, 3F, etc.) ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40f08e9b-a215-4905-aff0-9f05a388743d', '70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'A) DNV OS-103', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5fd56f12-d57d-4a3c-b364-b1c7af2b3c03', '70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'B) ASME Seção VIII Divisão 1', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa061676-2f73-4d74-8e76-1b8c44ebc4ce', '70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'C) API 1104', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65f54275-4eda-4b3d-b90d-e252425cef70', '70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'D) ASME Seção IX', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1fadbca1-f1d5-4ca1-9c6d-4fd72062c149', '70b53f53-8d91-4625-ba0f-d9abe1ed6df5', 'E) AWS D1.1', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('49dd28ea-3578-4b77-94f0-6570438fa3e7', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 20', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4c9fd282-5f26-45ca-a39a-397780af414a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '49dd28ea-3578-4b77-94f0-6570438fa3e7', 'multiple_choice', 'Em relação à qualificação de soldadores e operadores de soldagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5eb717b0-6761-46ea-8beb-9c617409db51', '4c9fd282-5f26-45ca-a39a-397780af414a', 'A) Um soldador ou operador de soldagem só pode participar na soldagem de uma determinada junta, caso ele já esteja qualificado para aquele serviço.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('beb7914a-9dcf-4a80-93ee-d5facc20fb0b', '4c9fd282-5f26-45ca-a39a-397780af414a', 'B) O trabalho de um soldador ou operador de soldagem fica restrito apenas ao que esteja registrado em seu Registro de Qualificação de Soldador ou Operador de Soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6bdfed4f-d453-4d92-a31c-b01346afc2f2', '4c9fd282-5f26-45ca-a39a-397780af414a', 'C) Um soldador ou operador de soldagem, estando qualificado em uma determinada norma de qualificação, pode soldar na construção de qualquer equipamento, independentemente da norma de projeto daquele equipamento.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5744c0a1-9375-43f5-ab01-0043d9c79c30', '4c9fd282-5f26-45ca-a39a-397780af414a', 'D) Dependendo da norma de qualificação, o fato do soldador ou operador de soldagem estar qualificado na posição sobre-cabeça, isto não significa que ele também pode soldar nas demais posições de soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9f7329e1-52da-49bf-92ba-5d14d0c6b130', '4c9fd282-5f26-45ca-a39a-397780af414a', 'E) A qualificação do soldador ou operador de soldagem fica atrelada a uma norma de qualificação, que, por sua vez, está associada a uma norma de projeto.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3d395ec0-9165-41fe-8a81-83f5efbd5d7a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('137f634f-331f-4ae8-a57a-726dd57a2646', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '3d395ec0-9165-41fe-8a81-83f5efbd5d7a', 'multiple_choice', '0 aproximadamente o mesmo tempo que levaria para qualificá-lo no processo MIG/MAG (GMAW). ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7bf26d6c-d319-4fa2-9c13-f792279a90d6', '137f634f-331f-4ae8-a57a-726dd57a2646', 'B) A energia de soldagem (aporte térmico) introduzida por um soldador em uma junta soldada na posição plana é aproximadamente a mesma energia, caso a junta estivesse na posição vertical.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d5f3bf8b-1454-4e68-b671-64a943d3dec9', '137f634f-331f-4ae8-a57a-726dd57a2646', 'C) Quanto menor o diâmetro de um tubo, maior deve ser a habilidade do soldador.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40ff646f-bc4b-457c-a8bb-43e53c087319', '137f634f-331f-4ae8-a57a-726dd57a2646', 'D) Quanto maior a diâmetro do metal de adição, menor deve ser a habilidade do soldador.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('612c9df4-e57b-4e75-b7d3-6d055691ce0c', '137f634f-331f-4ae8-a57a-726dd57a2646', 'E) A técnica usada por um soldador para soldar uma junta de ângulo na posição vertical com progressão ascendente é a mesma técnica usada para soldar na posição vertical com progressão descendente.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('525ffd68-54d2-4c84-8f18-a9103ef6a171', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 22', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7a6db743-e715-412d-bc82-d612b8770d71', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '525ffd68-54d2-4c84-8f18-a9103ef6a171', 'multiple_choice', 'Em relação à qualificação de soldadores e operadores de soldagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bcb5c103-d387-45d2-a799-6392959285ff', '7a6db743-e715-412d-bc82-d612b8770d71', 'A) Em caso de máxima urgência, os soldadores e operadores de soldagem podem ser qualificados utilizando a própria obra para realizarem suas qualificações.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cccd842d-f996-447e-8b52-ac6475c8d198', '7a6db743-e715-412d-bc82-d612b8770d71', 'B) Um determinado fabricante poder mostrar aos seus clientes um documento contendo o nome de todos os seus soldadores qualificados e suas respectivas qualificações, isto é uma maneira deste fabricante mostrar a qualidade de sua mão-de-obra.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('661b54d3-633f-4d8d-866f-e46f64827ce2', '7a6db743-e715-412d-bc82-d612b8770d71', 'C) A qualificação do soldador ou operador de soldagem demonstra a sua habilidade para produzir soldas aceitáveis de acordo com um procedimento de soldagem previamente aprovado.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb51d53b-8e2d-4abd-83bb-1742600ccfe5', '7a6db743-e715-412d-bc82-d612b8770d71', 'D) Os soldadores ou operadores de soldagem são qualificados executando suas soldas em peças de teste (em chapas ou tubos de teste) em função de uma norma de qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7f926233-9fd3-4f15-931d-b30a2a1ff2b9', '7a6db743-e715-412d-bc82-d612b8770d71', 'E) O tipo de metal de base a ser utilizado na qualificação de soldadores e operadores de soldagem, assim como o tipo de peça de teste, de ensaios, o critério de avaliação, entre outros, são determinados pela norma de qualificação.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b4fc309a-4cf2-4fc0-873c-adf2837834c3', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4e7bdcbf-5f6b-4a09-8d1f-b8479a7bda9a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b4fc309a-4cf2-4fc0-873c-adf2837834c3', 'multiple_choice', '1 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e8f1b04-ba4e-4df3-9e91-77c600391760', '4e7bdcbf-5f6b-4a09-8d1f-b8479a7bda9a', 'C) O tempo máximo em que um soldador ou operador de soldagem poderá ficar sem estar soldando, obrigando-o a uma nova qualificação, depende da norma de qualificação.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a8b643dd-f99c-44e3-9667-36875baa9af1', '4e7bdcbf-5f6b-4a09-8d1f-b8479a7bda9a', 'D) É de responsabilidade do fiscal da obra ou do engenheiro de soldagem controlar quais soldadores e operadores de soldagem devem passar por uma nova qualificação.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('032f8ecb-a4e5-4e5d-852b-ff8bc03a7184', '4e7bdcbf-5f6b-4a09-8d1f-b8479a7bda9a', 'E) Normas como a ASME IX e AWS D1.1 fixam em 6 (seis) meses o período máximo em que um soldador ou operador de soldagem pode ficar sem soldar, obrigando-o uma nova qualificação.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c9f506f0-c5f2-4684-af9b-739cfa4f156e', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 24', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7a1b8733-6d83-48bf-b1f1-e407831bf664', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'c9f506f0-c5f2-4684-af9b-739cfa4f156e', 'multiple_choice', 'Quais são os possíveis ensaios que podem ser realizados para uma qualificação de soldador ou operador de soldagem (junta de topo)? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('951aa286-ce09-43a1-baca-64cc7027839a', '7a1b8733-6d83-48bf-b1f1-e407831bf664', 'A) Ensaio visual.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83fdcdaa-2ffc-4bb1-81b6-f920151ef245', '7a1b8733-6d83-48bf-b1f1-e407831bf664', 'B) Ensaio de dobramento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b3a9020-9fa6-4c20-9c41-2b01d0552cb6', '7a1b8733-6d83-48bf-b1f1-e407831bf664', 'C) Ensaio radiográfico.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9549e06b-5351-4a61-872e-8b98682ddb1c', '7a1b8733-6d83-48bf-b1f1-e407831bf664', 'D) Ensaio de impacto.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('10a7ddfd-6140-4278-aac5-29158b792f42', '7a1b8733-6d83-48bf-b1f1-e407831bf664', 'E) As alternativas (a), (b), (c) estão corretas.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('824e66d8-c70c-467b-8563-d810ac4e186e', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 25', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1b46b0e5-1015-4086-ae3b-a0ff70847832', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '824e66d8-c70c-467b-8563-d810ac4e186e', 'multiple_choice', 'Qual o objetivo principal da realização da qualificação de soldador ou operador de soldagem? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0d987cf-8f8d-4156-8248-98bc9b687f15', '1b46b0e5-1015-4086-ae3b-a0ff70847832', 'A) Determinar as propriedades mecânicas da junta soldada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8a219042-0144-4231-9d07-c7f6fe74c5c7', '1b46b0e5-1015-4086-ae3b-a0ff70847832', 'B) Verificar a existência ou não de descontinuidades/defeitos nas juntas soldadas.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('86bcdf78-8256-48b6-8faf-e0a43f59adea', '1b46b0e5-1015-4086-ae3b-a0ff70847832', 'C) Verificar a existência ou não de descontinuidades/defeitos nas juntas soldadas, assim como determinar suas propriedades mecânicas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c313e1a-19a0-4272-9fa2-726d7f9f4837', '1b46b0e5-1015-4086-ae3b-a0ff70847832', 'D) Avaliar o estado das fontes de energia encontradas na fábrica.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6fa81de1-0813-4620-bdb8-83f95de5e2a0', '1b46b0e5-1015-4086-ae3b-a0ff70847832', 'E) Avaliar se a política de treinamento da mão de obra vem operando satisfatoriamente.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c1cd020a-a057-4f8f-bb4c-bd11a66801e9', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('40d37a01-c222-4e69-bd6c-30ef974cec7c', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'c1cd020a-a057-4f8f-bb4c-bd11a66801e9', 'multiple_choice', '2 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('163c75b0-6977-4ca0-88c7-562c18b97edd', '40d37a01-c222-4e69-bd6c-30ef974cec7c', 'B) O eixo dos corpos de prova referentes aos ensaios de dobramento, tração, impacto, entre outros, é sempre perpendicular ao eixo da junta soldada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e02cca0-0252-4003-ba61-1e50433234e5', '40d37a01-c222-4e69-bd6c-30ef974cec7c', 'C) Os tipos de ensaios a serem realizados em uma qualificação de procedimento de soldagem dependem da norma de qualificação utilizada..', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e59fa85c-8361-47d9-a621-2ed83e80dc1e', '40d37a01-c222-4e69-bd6c-30ef974cec7c', 'D) Todos os corpos de prova são retirados da peça de teste perpendicularmente ao eixo da junta soldada, à exceção dos corpos de prova referentes ao ensaio de tração que se localizam no mesmo eixo da junta soldada.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7023e6f2-9ba1-4960-a278-aedf367dae06', '40d37a01-c222-4e69-bd6c-30ef974cec7c', 'E) Caso o ensaio de impacto seja requerido, a quantidade de corpos de prova e as localizações do entalhe devem ser informadas na norma de qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3a575107-7af8-43b2-beb2-8e90275e222f', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 27', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '3a575107-7af8-43b2-beb2-8e90275e222f', 'multiple_choice', 'Quando um soldador ou operador de soldagem deve realizar uma nova qualificação? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('799d0277-26f8-4c9a-997f-307799f9c590', '7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'A) Ao término da obra, quando ocorreu sua primeira qualificação.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69cd0078-798f-4c00-ab7c-825f7fcf8409', '7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'B) Ao retornar de suas férias anuais, após permanecer 30 dias afastados de suas atividades diárias.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('afec6814-f56a-4cd3-9ce9-66ddd09b4244', '7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'C) Quando um novo equipamento estiver para iniciar sua fabricação, sendo a norma de projeto deste diferente daquela usada em sua qualificação..', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ac550dae-616a-4f27-9ad8-799b2acfe632', '7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'D) Uma vez o soldador ou operador de soldagem estando qualificado, o mesmo não precisa se qualificar novamente, a não ser que o mesmo fique afastado da ferramenta durante 6 (seis) meses.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db4f62ae-0889-4eb1-92f4-68bb271f0a37', '7b3b490d-91cc-46cb-89a2-abb1366b46c0', 'E) Quando este profissional mudar de setor internamente em uma fábrica.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('30784403-560c-4576-989a-d3a7baaccdd5', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 0', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '30784403-560c-4576-989a-d3a7baaccdd5', 'multiple_choice', '80%Mn, 0,40%Si, apresentando baixa resistência mecânica, quais são os ensaios mecânicos normalmente solicitados? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('85fc02bb-fbdf-41f7-8838-f0c1cf026aa7', '0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'A) Ensaios de tração e de dureza.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2a393079-6ff1-4df4-b28c-df62525272ba', '0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'B) Ensaios macrográfico e de tração.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b69dba8c-85ec-4dd5-8e08-504e62ff35b6', '0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'C) Ensaios de impacto e de dobramento.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bf60f1d9-1fc1-4f43-a8a8-597d7e501a97', '0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'D) Ensaios de dobramento e de impacto.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('05524845-ffdb-4ad2-9a0a-6d6deefc50e0', '0b922e87-3cc2-4719-afc1-ef0f19bf2e28', 'E) Ensaios de tração e de dobramento.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('619beafc-a53e-467b-b4b1-cf4a410bc308', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 30', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('16a5c18e-bab5-4493-a833-636ebaef1c7f', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '619beafc-a53e-467b-b4b1-cf4a410bc308', 'multiple_choice', 'Em uma qualificação de procedimento de soldagem que será empregada na fabricação de um vaso de pressão (temperatura de trabalho: 450oC; pressão de trabalho: 180 bar), qual dos ensaios mecânicos apresentados a seguir não deverá ter sua execução solicitada? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1e03d7e5-7021-44f3-a542-18bab757dbac', '16a5c18e-bab5-4493-a833-636ebaef1c7f', 'A) Ensaio de CTOD (Crack Tip Opening Displacement).', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d60d653f-55dd-4bf9-aeb5-fdda97020f26', '16a5c18e-bab5-4493-a833-636ebaef1c7f', 'B) Ensaio de dobramento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ab0ea01-3702-4b29-a31a-850556a4eeef', '16a5c18e-bab5-4493-a833-636ebaef1c7f', 'C) Ensaio de impacto.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('df271cdf-15a5-40b1-82df-d30c96f42c0f', '16a5c18e-bab5-4493-a833-636ebaef1c7f', 'D) Ensaio de dureza.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('36cc92af-a11e-453e-9961-621a7310e79c', '16a5c18e-bab5-4493-a833-636ebaef1c7f', 'E) Ensaio de tração.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('08271bc2-97b2-40cf-976e-297adc809dea', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 32', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '08271bc2-97b2-40cf-976e-297adc809dea', 'multiple_choice', 'Em uma qualificação de procedimento de soldagem, quais são os diferentes tipos de ensaios requeridos? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('022764c4-f085-4e52-883d-33e124bafeb3', '0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'A) Visual, dobramento (face e raiz), tração.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c40cd6b2-be14-43f4-9a5f-85dbb29b223a', '0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'B) Dobramento (lateral), tração, impacto.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be6cf0f3-071d-4af5-b844-12ef2a2fbe7a', '0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'C) Fratura, macrografia.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7594d864-172d-4292-8da4-3001b0513725', '0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'D) Nick-break, dobramento (lateral, face e raiz), impacto.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46646796-112b-40d6-8451-834cb35ec22a', '0000b95e-ce9a-4fe2-8ba6-7532a1391b64', 'E) Depende da norma de qualificação aplicável e do tipo de junta a ser analisada.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b95cf08b-2ba5-406b-9ba5-5a0599cf6fed', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 1', 'Resolva a questão', 28)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d73ddab7-9cc6-4962-9d00-e141624e4baf', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b95cf08b-2ba5-406b-9ba5-5a0599cf6fed', 'multiple_choice', 'Uma medição realizada com um paquímetro apresentou a leitura representada na figura a seguir. Com base nessa figura, qual foi a medida obtida? \n\n<img src="/images/questions/page205_img1.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20641c92-c35b-4d5e-adb3-d656d81afc71', 'd73ddab7-9cc6-4962-9d00-e141624e4baf', 'K) 11,3 cm', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12378f63-8d6f-4c2f-9724-6e131f5ad18b', 'd73ddab7-9cc6-4962-9d00-e141624e4baf', 'L) 1,03 mm', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('31e90161-30e7-43cb-8c89-5d62d714ea7c', 'd73ddab7-9cc6-4962-9d00-e141624e4baf', 'M) 1,3 cm', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4bc8a72f-b0c4-4ed4-a808-d3c5ea0dc406', 'd73ddab7-9cc6-4962-9d00-e141624e4baf', 'N) 11,3 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f3cc2f39-14a4-418e-898b-fbffc1760e32', 'd73ddab7-9cc6-4962-9d00-e141624e4baf', 'O) 10,3 mm', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('648b0a20-af88-4a3d-a249-db9d97ca833c', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 29)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '648b0a20-af88-4a3d-a249-db9d97ca833c', 'multiple_choice', 'O diâmetro de uma barra cilíndrica foi medido em 44,54mm. Esta medição convertida para polegada apresenta o seguinte resultado: \n\n<img src="/images/questions/page205_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33ed62f2-6799-47ab-a18e-d8ed42adec77', '933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'A) ¾”', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b488094d-a8e6-4998-9754-4603a4097cd3', '933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'B) 1 ¼”', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('79eb6df8-549e-43e1-b431-e3548542cab6', '933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'C) 1 ¾”', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4dccf96d-2853-44fb-b5bf-a4df30f7e1ef', '933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'D) 1 ½”', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('071ccbdd-cc4a-4d3e-8a61-1c7fad697f23', '933a5f0a-5e8d-4cfc-bf24-4a8f46f87929', 'E) 2 ¼”', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c3f5a850-3949-4244-9ac7-dc038a3945b2', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 3', 'Resolva a questão', 30)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'c3f5a850-3949-4244-9ac7-dc038a3945b2', 'multiple_choice', 'Se 1” (inch = polegada) é igual a 25,4 mm e se 1” é igual a 0,08` (foot = pé), quantos pés equivalem 100 cm (aproximadamente)? \n\n<img src="/images/questions/page205_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f1bcf0e1-de76-4cbe-89a4-07f812af7236', '327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'F) 3,15 pés.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bd791c29-039b-43f5-afdf-713da5df2181', '327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'G) 3,00 pés.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('072a0253-7800-410e-995b-65cc80909c4f', '327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'H) 2,85pés.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c22bf7e-c513-4519-afcd-1fa5237f74cb', '327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'I) 3,30 pés.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('113da36e-4e17-4bae-a6b7-14703d27f877', '327adfd9-8c4f-4cd6-a18d-aa1ee97777ee', 'J) 3,50 pés.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9638690f-c397-47d3-afab-242f4e7f4e95', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 4', 'Resolva a questão', 31)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6cd6a646-dd93-40a5-8ca7-51033481a285', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '9638690f-c397-47d3-afab-242f4e7f4e95', 'multiple_choice', 'Um brasileiro ao chegar aos Estados Unidos em um rigoroso inverno, observou que a temperatura ambiente no aeroporto era -40ºF. Qual seria o valor daquela temperatura caso o termômetro marcasse em graus Celsius? Usar a fórmula: ºF = (ºC x 9/5) + 32 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('873c3bff-aca1-46cd-b804-bb8e049a188c', '6cd6a646-dd93-40a5-8ca7-51033481a285', 'F) -25ºC', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f850c157-ed0f-43e3-9e58-732535ba66b9', '6cd6a646-dd93-40a5-8ca7-51033481a285', 'G) -40ºC', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ba3a7d3-ef78-45ee-99da-18e8f5daa1e9', '6cd6a646-dd93-40a5-8ca7-51033481a285', 'H) 0ºC', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b40f31dd-f6f8-4ea4-9f55-6f97f676c409', '6cd6a646-dd93-40a5-8ca7-51033481a285', 'I) -30ºC', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21e8cda7-cd0f-4f02-8310-c4c237f5ddbb', '6cd6a646-dd93-40a5-8ca7-51033481a285', 'J) -10ºC.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b085afdf-a507-46f2-8ead-93bfce513864', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 6', 'Resolva a questão', 32)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b085afdf-a507-46f2-8ead-93bfce513864', 'multiple_choice', 'Necessitando conhecer o diâmetro da alma de um eletrodo revestido, qual dos instrumentos de medida listados a seguir seria o mais correto para realizar a medição? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0f98e349-e20c-4e3c-927f-7fc08ab22b69', 'b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'F) Régua.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('27880442-ad5a-42f2-ad92-063b7885142b', 'b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'G) Trena.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e031ac12-83d4-4358-a1c5-a210fa15f632', 'b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'H) Calibre de solda.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b665a7ec-a49e-418c-9a3d-444dc354d1ba', 'b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'I) Goniômetro.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('03765bb5-b7ef-4556-aba3-f214d6efb6b5', 'b9dcf465-e0a8-411b-b2d7-2620cde7df98', 'J) Paquímetro.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2b4fdc07-1f1f-4003-8bef-306634ac51ad', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 7', 'Resolva a questão', 33)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4f77e161-c710-4337-82f0-4a843d66af21', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '2b4fdc07-1f1f-4003-8bef-306634ac51ad', 'multiple_choice', 'Qual dos instrumentos de medida apresentados abaixo não é apropriado para fazer a leitura da altura do reforço de uma solda de topo? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('000890c4-3d72-4509-a392-f0dafb340c71', '4f77e161-c710-4337-82f0-4a843d66af21', 'F) Paquímetro.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d1b253b1-0228-4048-9492-79aa73491a08', '4f77e161-c710-4337-82f0-4a843d66af21', 'G) Régua esquadro.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67daa661-d0b2-4d50-b9bf-d470e11e6640', '4f77e161-c710-4337-82f0-4a843d66af21', 'H) Micrômetro.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('facae6db-cc8f-4a45-bb77-c1c0fefe2624', '4f77e161-c710-4337-82f0-4a843d66af21', 'I) Trena.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8718d66d-3e84-42d6-8691-8b6c4955ecd9', '4f77e161-c710-4337-82f0-4a843d66af21', 'J) Gabarito de solda.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9b2dfe1d-d362-4876-9094-040d38f8bc8b', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 34)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '9b2dfe1d-d362-4876-9094-040d38f8bc8b', 'multiple_choice', '1 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9bde8352-a761-470c-b96f-7fe4f8e55fde', '5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'A) 20º 55` 54”', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18788531-5068-4407-9f8c-8556318b0059', '5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'B) 19º 55` 54”', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d99199d1-17e5-458b-b9c0-eb1091c5b8d2', '5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'C) 29º 54` 55”', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3a166afb-b224-4e59-8401-a966cedd76de', '5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'D) 19º 115` 114”', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('72077298-7461-4601-b07a-98df0f08cb5f', '5f3b659e-2bc5-4955-b390-dc9ffe985bce', 'E) 09º 55` 54”', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0a46672c-0b88-4367-9157-efc524b39e71', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 33', 'Resolva a questão', 35)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b41e244e-36e1-4353-a33d-8877f96cd45a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '0a46672c-0b88-4367-9157-efc524b39e71', 'multiple_choice', '25` 50” e 56` 54” ? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b73f59c-4495-4b38-8bd4-8352e265c906', 'b41e244e-36e1-4353-a33d-8877f96cd45a', 'A) 90º 19`', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('34c0d823-d32e-4c25-8b09-4e8c27e0dc31', 'b41e244e-36e1-4353-a33d-8877f96cd45a', 'B) 34º 22` 44”', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a1eb8dbc-12fc-420b-8376-69bb0a7ce1ff', 'b41e244e-36e1-4353-a33d-8877f96cd45a', 'C) 90º 44` 54”', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('27df1f6a-840b-4352-a5a0-5f784b81d959', 'b41e244e-36e1-4353-a33d-8877f96cd45a', 'D) 33º 82` 104”', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb484728-6799-4989-acc9-993cc87b95ec', 'b41e244e-36e1-4353-a33d-8877f96cd45a', 'E) 40º 22` 44”', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6140b33b-588d-4ddf-8596-759ab152c4f1', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 12', 'Resolva a questão', 36)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6d05279d-ea90-4f36-b735-5128d435a938', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '6140b33b-588d-4ddf-8596-759ab152c4f1', 'multiple_choice', 'Converta 0,222” (polegada) em milímetro, empregando a regra de multiplicação com algarismos significativos (arredondamento). Marque a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb5cbdad-e3df-47d5-abbc-8f582f18d417', '6d05279d-ea90-4f36-b735-5128d435a938', 'A) 5,6 mm', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed878d14-b2ee-4c65-975c-0d69df1a2d2e', '6d05279d-ea90-4f36-b735-5128d435a938', 'B) 5,64 mm', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('14229a6a-58ed-4e8a-b3e1-fd16ce717457', '6d05279d-ea90-4f36-b735-5128d435a938', 'C) 5, 639 mm', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('774f072c-ea62-42cd-a29b-a0eec8f501bd', '6d05279d-ea90-4f36-b735-5128d435a938', 'D) 5, 6388 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8535a7ce-bbde-441f-a1e2-ffcd9579d5ae', '6d05279d-ea90-4f36-b735-5128d435a938', 'E) 6,0 mm', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b32403f0-8535-4dbb-9be6-9690cd726b7a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 13', 'Resolva a questão', 37)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4382f68f-70b3-4c26-9e87-00a7ea44446a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b32403f0-8535-4dbb-9be6-9690cd726b7a', 'multiple_choice', 'As alternativas apresentadas a seguir são operações feitas com algarismos significativos. Marque a operação incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('07377b76-a172-482f-8d19-ac72af95bb8d', '4382f68f-70b3-4c26-9e87-00a7ea44446a', 'A) 55,00 + 10,1111 = 65,11', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1ce0e775-0d89-4b71-8cfe-371f299c1a9d', '4382f68f-70b3-4c26-9e87-00a7ea44446a', 'B) 7,333 – 0,90 = 6,47', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c75d7fc9-2b95-4493-90bb-d009ca78569f', '4382f68f-70b3-4c26-9e87-00a7ea44446a', 'C) 100,00 / 50 = 2,0', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb3df90b-57af-4dd5-8132-d5aa2e48cdcb', '4382f68f-70b3-4c26-9e87-00a7ea44446a', 'D) 22,0 / 2 = 11', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a5a1cb8-6dfd-4ba8-899f-296d47099591', '4382f68f-70b3-4c26-9e87-00a7ea44446a', 'E) 2,50 x 1,5 = 3,75', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2b32bbd1-8f70-47fe-99a2-fe17a528b97d', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 38)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '2b32bbd1-8f70-47fe-99a2-fe17a528b97d', 'multiple_choice', '2 identifique o lápis térmico a ser utilizado na qualificação, visto que o lápis relativo à temperatura de 150ºC foi perdido? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db296119-a19f-479d-b527-b7336188c254', '5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'A) 145ºC', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4fef639c-d903-437a-8be3-1f0bda4434d1', '5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'B) 180ºC', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('11c50566-2cdb-4ea6-a354-556e7adfe3b6', '5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'C) 160ºC', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f0657910-6e91-423e-9bd5-d3fe541270d6', '5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'D) 170ºC', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('011f0a15-941e-46d2-9f45-413ba96f5508', '5bee3a82-84cb-42f7-bd07-06fa4555c8ac', 'E) 140ºC', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('be1adf37-d0c8-4536-a63c-8f69f1ac01a8', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 15', 'Resolva a questão', 39)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'be1adf37-d0c8-4536-a63c-8f69f1ac01a8', 'multiple_choice', 'Qual das alternativas apresentadas encontra-se incorreta, quando se faz uma relação entre a medida que se quer obter a sua unidade correspondente? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8f3db0c0-d95c-46af-9656-cecac95871e1', '62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'A) Intensidade de corrente elétrica – Ampère (A)', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0a16654-a064-4fd5-b613-8c2f2b702166', '62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'B) Lápis térmico – Fahrenheit (ºF)', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('84b9a0d1-bfa7-45c2-bfa8-5fcb18cf8a0d', '62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'C) Tensão - Volt (V)', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45f53a9d-dc52-4fc4-a901-aa59a34e066b', '62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'D) Ângulo - Grau (º)', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9f93ea3-1a59-414e-86e2-184940cac5ba', '62f3a25b-c7f6-4ae6-90bf-00fc209da506', 'E) Pressão do gás - kgf/ ºC2', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b4d5f0b4-15a8-4a69-a5b0-18b282668f36', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 16', 'Resolva a questão', 40)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b4d5f0b4-15a8-4a69-a5b0-18b282668f36', 'multiple_choice', 'Qual dos instrumentos listados a seguir não apresenta valores obtidos diretamente de um mostrador analógico ou digital? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a87cb114-7be4-4c4f-837e-da91726bcade', '90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'A) Manômetro', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8d2d7c8-af3d-424c-8df5-6e048bb9b57a', '90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'B) Pirômetro de contato', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12daa57b-baad-41a6-a1b7-9162e6c5e2be', '90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'C) Amperímetro', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d7781cd-3edb-4025-8a54-3a28a327c8e2', '90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'D) Lápis térmico', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f252ab5b-0e44-4c1e-a5df-3bab295e255f', '90bf5f83-c1f2-4aa6-b03e-4afcc9bd7176', 'E) Trena a laser', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('dfb23ba2-82fc-4ba2-8a8b-e326d154ece3', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 17', 'Resolva a questão', 41)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'dfb23ba2-82fc-4ba2-8a8b-e326d154ece3', 'multiple_choice', 'Em relação ao instrumento “Pirômetro de Contato”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f0acb7eb-54f3-4ccd-bf64-194deaaa12b4', '935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'A) Como vantagem: possui dispositivo de segurança que impede que o instrumento se danifique, caso a temperatura a ser lida seja muito superior à temperatura máxima do aparelho.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f96a3ab8-4913-41f7-92bc-ef34e40eb2ab', '935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'B) Como vantagem: boa precisão na leitura da temperatura.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c7708896-7cac-4285-b183-5997e0847d1e', '935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'C) Como desvantagem: necessidade de ajustar instrumento toda vez que houver mudança na posição de trabalho.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d46b648b-19d8-47a9-9c09-f420ab89c095', '935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'D) Como vantagem: não oferece risco de contaminação na região do equipamento, onde será feita a leitura da temperatura.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('77ef0447-58a0-4aaf-8e7c-10ed36a89b66', '935ce3c7-9d02-4eed-96f0-df4a3cb8764f', 'E) Como desvantagem, apresenta um custo elevado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e59e7dc1-f29b-4e7f-a216-4c6838be2fc8', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 18', 'Resolva a questão', 42)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'e59e7dc1-f29b-4e7f-a216-4c6838be2fc8', 'multiple_choice', 'Calcule as taxas de aquecimento e de resfriamento baseadas na curva encontrada no registrador de temperatura apresentado a seguir. \n\n<img src="/images/questions/page213_img1.jpeg" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4022b27-fddb-421b-a3da-3521c64f3145', 'd6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'A) Taxa de Aquecimento: 600ºC/h; Taxa de Resfriamento: 300ºC/h', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('29151fc1-e0ad-41c0-b748-9ae1b8f5e395', 'd6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'B) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 400ºC/h', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ec8ab11-82be-4166-8a54-622c101d50f8', 'd6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'C) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 400ºC/h', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c932db3-4d9c-4f43-9e29-e311b9a014bd', 'd6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'D) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 300ºC/h', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a947db44-212d-4787-863e-43a901db9e17', 'd6fb6fa9-3c10-4c3c-a3ee-9e25841eea8c', 'E) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 300ºC/h', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('44ec4bc5-daa0-499d-94c1-bc17b93fcb81', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 19', 'Resolva a questão', 43)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '44ec4bc5-daa0-499d-94c1-bc17b93fcb81', 'multiple_choice', 'Em relação ao instrumento “Registrador de Temperatura”, identifique a alternativa incorreta. \n\n<img src="/images/questions/page213_img1.jpeg" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fe25ee0-ebed-467f-8e66-48beb2525394', '6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'A) O Registrador deve ser periodicamente calibrado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('291c562e-fc66-40d2-ac39-44664fa2da79', '6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'B) Uma desvantagem deste instrumento é a impossibilidade do registro das condições térmicas a que foi submetida ao equipamento.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a54f8679-2f5c-4380-af04-8aedd8ef05ac', '6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'C) É um instrumento bastante frágil.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee33ea9d-ebf3-4bea-bf35-d13ac3a14c20', '6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'D) Permite o controle e registro de mais de um termopar simultaneamente.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f6bea21c-0194-4605-8ef7-93467f41103c', '6462acf2-4d29-4578-b6db-b65d63a0b1b7', 'E) O Registrador apresenta uma grande desvantagem em função do seu alto preço.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1f4466dd-6e55-40d9-9f10-88b81a613308', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 2', 'Resolva a questão', 44)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f5133614-b06c-4204-a388-ac452a1de8d3', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '1f4466dd-6e55-40d9-9f10-88b81a613308', 'multiple_choice', '5 \n\n<img src="/images/questions/page215_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('26829d2e-7cae-4147-ab75-779e8f465c56', 'f5133614-b06c-4204-a388-ac452a1de8d3', 'C) É um instrumento de baixíssima precisão.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eceb689a-ae73-4501-8fe2-0ced034330a2', 'f5133614-b06c-4204-a388-ac452a1de8d3', 'D) Dependendo do tipo de metal de base, pode haver risco de contaminação na região que será medida a temperatura.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d6280b6-fff4-4e24-bb76-a9924087eb98', 'f5133614-b06c-4204-a388-ac452a1de8d3', 'E) Não se pode usar este instrumento, se a superfície do equipamento estiver coberta por uma camada isolante.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('becfa67b-892b-4f69-9f13-423db309d3a0', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 22', 'Resolva a questão', 45)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('50bac7f1-e858-4277-a1b6-58ba91a768f1', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'becfa67b-892b-4f69-9f13-423db309d3a0', 'multiple_choice', 'No caso da soldagem de uma junta de topo, for observado o aparecimento de um embicamento após o término da tarefa, qual dos instrumentos apresentados a seguir deveria ser utilizado para quantificar o problema? \n\n<img src="/images/questions/page215_img1.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2bb8fea-7ec0-432a-a7dd-96a17601a990', '50bac7f1-e858-4277-a1b6-58ba91a768f1', 'A) Régua-esquadro', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b478907c-e266-4683-949e-a6b30a0c8025', '50bac7f1-e858-4277-a1b6-58ba91a768f1', 'B) Transferidor', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b33ae1dc-75ad-4b6e-ac86-1f892ddc484c', '50bac7f1-e858-4277-a1b6-58ba91a768f1', 'C) Paquímetro', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9eefd197-7cb2-4b30-bf9b-c6bb1e34ffd1', '50bac7f1-e858-4277-a1b6-58ba91a768f1', 'D) Goniômetro', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ce362f6f-9e1e-4183-ba35-8f291d211da3', '50bac7f1-e858-4277-a1b6-58ba91a768f1', 'E) Trena', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('025e1b48-2297-4086-9375-0189ac99297e', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 23', 'Resolva a questão', 46)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('107cdd98-b5ac-439c-b089-424dec731430', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '025e1b48-2297-4086-9375-0189ac99297e', 'multiple_choice', 'Qual o valor que o paquímetro está medindo? . \n\n<img src="/images/questions/page215_img1.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('040f1d22-5b55-4454-8981-82bb607a7ba3', '107cdd98-b5ac-439c-b089-424dec731430', 'A) 25,85 mm', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('64205c75-5d2e-4d6c-83cd-904902ff020b', '107cdd98-b5ac-439c-b089-424dec731430', 'B) 24,85 mm', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae58447f-e980-4601-962a-3bddd280469a', '107cdd98-b5ac-439c-b089-424dec731430', 'C) 2,44 mm', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83aa9f50-2388-420b-a94d-2cd4f022843a', '107cdd98-b5ac-439c-b089-424dec731430', 'D) 25,40 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d45ad6b9-9264-4ac6-af12-62354386c3cf', '107cdd98-b5ac-439c-b089-424dec731430', 'E) 24,40 mm.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d23bfd8d-17a3-444d-923a-a80cbf9d158c', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 24', 'Resolva a questão', 47)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9352dfeb-cfe6-4877-a453-6cc3a9215358', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'd23bfd8d-17a3-444d-923a-a80cbf9d158c', 'multiple_choice', 'Qual o valor que o paquímetro está medindo? . \n\n<img src="/images/questions/page216_img1.png" width="100%" />\n\n<img src="/images/questions/page216_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('39c7ff8c-c7fd-4de5-ab72-c39956a67edb', '9352dfeb-cfe6-4877-a453-6cc3a9215358', 'A) 20,975 mm', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('00d625fb-ef1b-411f-8334-9ddecba104fc', '9352dfeb-cfe6-4877-a453-6cc3a9215358', 'B) 20,950 mm', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('51b94136-cb49-45ad-880e-5401a66ca287', '9352dfeb-cfe6-4877-a453-6cc3a9215358', 'C) 20,550 mm', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2917dd0-5ab5-44a1-9ad7-4fb0b48c84b5', '9352dfeb-cfe6-4877-a453-6cc3a9215358', 'D) 21,150 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('730284cc-b4a3-4484-a59c-cb0c05df6175', '9352dfeb-cfe6-4877-a453-6cc3a9215358', 'E) 20,795 mm', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('89f2661f-b696-44fe-ba7f-a5d9cf8ddbc5', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 26', 'Resolva a questão', 48)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '89f2661f-b696-44fe-ba7f-a5d9cf8ddbc5', 'multiple_choice', 'Na soldagem de uma junta de topo, foi observada na EPS a necessidade de realizar o controle de temperatura interpasse. Ficou estabelecida a temperatura máxima igual a 250ºC. Das alternativas apresentadas a seguir, identifique o lápis térmico que deverá ser utilizado para controlar esta temperatura, sabendo-se que aquele relativo à temperatura de 250ºC não foi encontrado? \n\n<img src="/images/questions/page217_img1.jpeg" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cefd1eb2-4b09-4f68-9182-d16e88eb3c5d', 'da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'A) 230ºC', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('84a8d6bd-9459-42dc-acd9-e224f8c99b91', 'da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'B) 260ºC', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('693c2c31-8861-40e4-985b-d0d8de71596b', 'da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'C) 270ºC', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('96e7fd3c-5c42-4a95-957c-bfee528c977b', 'da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'D) 225ºC', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('713ea6c6-03c0-4f38-96ea-d75b51716027', 'da22005b-5d5c-4988-aa51-30c0a2f2aa1a', 'E) 200ºC .', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8ae3287c-566c-4e61-8116-5b98cfe52650', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 27', 'Resolva a questão', 49)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '8ae3287c-566c-4e61-8116-5b98cfe52650', 'multiple_choice', 'Calcule as taxas de aquecimento e de resfriamento baseadas na curva encontrada no registrador de temperatura apresentado a seguir. \n\n<img src="/images/questions/page217_img1.jpeg" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('87a0cf74-3826-416d-b8ee-4304d9d8333d', 'f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'A) Taxa de Aquecimento: 450ºC/h; Taxa de Resfriamento: 450ºC/h', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('86671a8b-3e35-4552-973a-6042a4a7e865', 'f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'B) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 450ºC/h', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('624ed39b-f7df-4e49-9946-95609cbf7b0a', 'f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'C) Taxa de Aquecimento: 300ºC/h; Taxa de Resfriamento: 900ºC/h', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('01793b5d-0996-43d7-b74c-08919bbd37ac', 'f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'D) Taxa de Aquecimento: 400ºC/h; Taxa de Resfriamento: 450ºC/h', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('96794042-ff01-481a-9a74-2ed0b392b321', 'f7f509f5-2762-4a50-b5ec-bdd37bc055d6', 'E) Taxa de Aquecimento: 900ºC/h; Taxa de Resfriamento: 450ºC/h', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f21b6a33-58d5-4c88-a03e-5de78bb0a883', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 28', 'Resolva a questão', 50)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b03ea372-48be-4f49-a894-16ce42975d76', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'f21b6a33-58d5-4c88-a03e-5de78bb0a883', 'multiple_choice', 'Dentre as alternativas abaixo, assinale a afirmativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('13daae61-4c0c-469c-be1e-8bbf36ea6039', 'b03ea372-48be-4f49-a894-16ce42975d76', 'A) Os gabaritos fornecem bons resultados, desde que fabricados corretamente.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('397ed838-d149-49d5-a1b1-7d6d15d96fe9', 'b03ea372-48be-4f49-a894-16ce42975d76', 'B) Os gabaritos devem ser fabricados com uma boa precisão.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ead4f2e1-bd2f-41cd-86d2-678cb5aa33dc', 'b03ea372-48be-4f49-a894-16ce42975d76', 'C) Os gabaritos devem ser utilizados em verificações repetitivas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dfdff33f-9012-48eb-8411-6f3aad4dbf93', 'b03ea372-48be-4f49-a894-16ce42975d76', 'D) Os gabaritos devem apresentar uma graduação gravada em seu corpo, de forma precisa e legível.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b0829eb7-da74-473f-a39c-c21faf140b0b', 'b03ea372-48be-4f49-a894-16ce42975d76', 'E) Os gabaritos são dispositivos que permitem uma rápida verificação.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('87897abe-3617-4396-9fa1-4b086d339935', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 29', 'Resolva a questão', 51)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d27d7d21-810b-4ecd-b2e6-651c1f849484', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '87897abe-3617-4396-9fa1-4b086d339935', 'multiple_choice', 'Das descontinuidades apresentadas abaixo, assinale aquela que normalmente é observada quando do uso de gabaritos. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bc7a43f0-d49c-46b7-99d4-c792c0edbfb8', 'd27d7d21-810b-4ecd-b2e6-651c1f849484', 'A) Ângulo excessivo de reforço.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eaa8576b-c092-4cba-ab0e-839fe573b7b7', 'd27d7d21-810b-4ecd-b2e6-651c1f849484', 'B) Reforço excessivo.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c61d795b-eb62-45f5-88eb-e6aca9313082', 'd27d7d21-810b-4ecd-b2e6-651c1f849484', 'C) Desalinhamento.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e63d8f5-b803-4116-b85b-319a7f8302ae', 'd27d7d21-810b-4ecd-b2e6-651c1f849484', 'D) Deformação angular.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('25c45f6f-753d-4746-9d5b-b35a12b40ec8', 'd27d7d21-810b-4ecd-b2e6-651c1f849484', 'E) Embicamento.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3a087ce4-dd07-4171-a245-65ef8521aced', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 30', 'Resolva a questão', 52)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e3fa4531-a913-4ab3-9298-07fd86e4c031', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '3a087ce4-dd07-4171-a245-65ef8521aced', 'multiple_choice', 'Em relação ao emprego de gabaritos na fabricação de equipamentos metálicos, identifique a afirmativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c9769a6-7169-4735-8e31-c7f4ed32aa1d', 'e3fa4531-a913-4ab3-9298-07fd86e4c031', 'A) Não necessitam de atenção especial, quando da existência de reforços de solda existentes na região do equipamento que será inspecionada.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92413f55-8726-45a6-9ef3-c4e00ba69fce', 'e3fa4531-a913-4ab3-9298-07fd86e4c031', 'B) Servem também para verificar a ovalização de tubos soldados.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b3898548-e0ea-4e5b-a207-c00618d1a06c', 'e3fa4531-a913-4ab3-9298-07fd86e4c031', 'C) Devem ser fabricados de um material leve para que sejam fáceis de ser manuseados.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d5ed467d-9220-43eb-8f3b-d4992969e6a3', 'e3fa4531-a913-4ab3-9298-07fd86e4c031', 'D) São normalmente usados quando os instrumentos convencionais não atendem às necessidades.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2293f88d-8571-470f-9602-2d31a222202f', 'e3fa4531-a913-4ab3-9298-07fd86e4c031', 'E) Devem ser posicionados perpendicularmente em relação às chapas que serão analisadas, no momento da checagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('da5c4a66-ff28-49d4-9167-80974b76b3aa', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 31', 'Resolva a questão', 53)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'da5c4a66-ff28-49d4-9167-80974b76b3aa', 'multiple_choice', 'Qual das alternativas abaixo não pode ser medida por um Calibre com Finalidade Múltipla (ver figuras)? \n\n<img src="/images/questions/page219_img1.jpeg" width="100%" />\n\n<img src="/images/questions/page219_img2.jpeg" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d0c6b27f-627b-432e-b507-1564a5115547', 'b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'A) Perna de solda.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b963db0-c28d-4f01-b645-3894777e62b7', 'b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'B) Ângulo do embicamento.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06e5c608-44ea-458f-93dc-737642344225', 'b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'C) Ângulo de bisel.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4488f06b-cb6e-4197-8d81-fdbf62e994ce', 'b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'D) Abertura da raiz.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d2b7c5c-189a-479e-a0a8-fa06f8ba404c', 'b1416bc5-f6bb-4b2a-a077-3837d8b41006', 'E) Garganta de solda.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('68bba63a-20dc-4daf-a693-cd06d6ce8354', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 32', 'Resolva a questão', 54)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '68bba63a-20dc-4daf-a693-cd06d6ce8354', 'multiple_choice', 'Qual das alternativas abaixo não pode ser medida por um Calibre com Finalidade Múltipla (ver figuras)? \n\n<img src="/images/questions/page219_img1.jpeg" width="100%" />\n\n<img src="/images/questions/page219_img2.jpeg" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6bff371a-8a2f-4f3d-95ac-f8ea8135e102', '5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'A) Altura do reforço da solda.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('87fa848d-9c73-4c1e-a59d-27ddb1f11ecf', '5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'B) Altura da face da raiz (anterior à montagem das peças).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f74fff9a-d993-4115-afcc-171e9badc2fd', '5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'C) Espessura da chapa ou do tubo.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6296fdbf-bb7b-45e2-b541-66ef861fdae2', '5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'D) Deformação angular.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1c09577d-9bb5-4224-970c-bd0bb79d80c4', '5b80e2ea-3b65-4cee-b579-508c4c6d02ab', 'E) Desalinhamento.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6d57561e-f377-46b1-97a9-2e12511b7dac', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 33', 'Resolva a questão', 55)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'c500b41d-05b0-4894-9864-ef060c2b5a57', '6d57561e-f377-46b1-97a9-2e12511b7dac', 'multiple_choice', 'Quando se utiliza um paquímetro, várias são as preocupações que o usuário deve ter para que a leitura da medida seja precisa e confiável. Das alternativas apresentadas a seguir, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0b6ea460-9415-4071-9625-169124802699', 'dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'A) Guardar o paquímetro sempre sem folga entre os bicos.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8176b172-dbb8-48f7-aca1-894845566063', 'dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'B) Manter o paquímetro sempre limpo e acondicionado em estojos próprios.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8ecc9d8a-ff43-4d91-9b6b-bc1b032fb1e5', 'dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'C) Fazer a leitura da medida com o paquímetro aplicado à peça.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9d1b37c6-d38a-4869-9127-742f8695c67e', 'dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'D) Antes do uso, com o paquímetro totalmente fechado, verificar se não há folga entre os seus encostos ou garras.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c7e30e1-95f1-4919-9950-47927e09467b', 'dae4189f-78a3-45ef-a539-5c1ee82b33bb', 'E) Não pressionar demasiadamente os encostos ou garras do paquímetro contra a superfície da peça que será medida.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b8a3b049-1853-4092-9ffc-1e191fcd6e9b', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 34', 'Resolva a questão', 56)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('69bd006f-465a-42f0-8ca3-b91974c8c671', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'b8a3b049-1853-4092-9ffc-1e191fcd6e9b', 'multiple_choice', 'Qual das alternativas a seguir não está relacionada com as características do Pirômetro de Contato? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b951986-b696-452d-9648-b2a74711f407', '69bd006f-465a-42f0-8ca3-b91974c8c671', 'A) Instrumento que pode ser analógico ou digital.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ab37c88a-1d23-48bd-8cf7-51a9c5a02932', '69bd006f-465a-42f0-8ca3-b91974c8c671', 'B) Registra temperaturas entre -50ºC e 1.400ºC.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f5b58b33-3682-4221-9c5f-d3947f9f9afb', '69bd006f-465a-42f0-8ca3-b91974c8c671', 'C) Instrumento destinado a medir temperaturas de superfícies.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c393c4fb-3b17-4f80-af0e-efc022e2cec7', '69bd006f-465a-42f0-8ca3-b91974c8c671', 'D) Instrumento que, quando utilizados em soldagem, podem verificar temperaturas de pré-aquecimento, interpasse e de pós-aquecimento.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('90a2d06e-d289-4eb2-8d72-e472165e221f', '69bd006f-465a-42f0-8ca3-b91974c8c671', 'E) Operam mediante contato físico, podendo também medir temperaturas à distância.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a16b91a7-476d-45e6-95b7-3dd1c0a6e9b7', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 35', 'Resolva a questão', 57)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'a16b91a7-476d-45e6-95b7-3dd1c0a6e9b7', 'multiple_choice', 'Quanto ao uso de instrumentos que medem temperaturas na soldagem (Pirômetro de contato e Lápis térmico), marque a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('431b9020-c680-41dd-b7e7-b19ea9694dcb', '70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'A) O pirômetro de contato serve para aferir a temperatura de qualquer material metálico.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('42a01741-ca87-4320-a7f8-580af458a76e', '70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'B) Anteriormente ao uso do pirômetro de contato ou do lápis térmico, é imprescindível verificar a unidade de temperatura (º C ou ºF) dos instrumentos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6010e3bb-4b0a-4afe-859e-1ca1d4f8315f', '70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'C) A contaminação do material de base é uma das maiores desvantagens ao se utilizar o lápis térmico.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('598291cc-9fbd-4a3b-bcf5-76829d343bbc', '70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'D) Ambos os instrumentos têm a mesma finalidade quando relacionados à soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d13a9dc-98d6-4b99-8fca-2b583d73f8bd', '70ef3d4f-35a9-42ff-a3d7-5e9d399afce4', 'E) É desnecessária a verificação da faixa de temperatura de utilização do sensor de um pirômetro de contato anteriormente ao seu uso.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ad08e26f-ed6b-476a-b468-4616a04b7c9e', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'activity', 'Questão 36', 'Resolva a questão', 58)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'c500b41d-05b0-4894-9864-ef060c2b5a57', 'ad08e26f-ed6b-476a-b468-4616a04b7c9e', 'multiple_choice', 'Quanto às características dos Pirômetros de contato, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e2a6344f-5084-432c-8355-4ff7a2020159', '543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'A) Os pirômetros de contato que apresentam indicadores de ponteiros podem ser usados em qualquer posição sem que haja a necessidade de fazer qualquer tipo de ajuste.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20b6e90d-519d-46c9-ae97-01e4ff75265c', '543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'B) Instrumento caro, devendo restringir a sua utilização a situações onde métodos mais baratos são desaconselháveis.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('829ccf80-0405-46a3-bece-131a2e9888b8', '543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'C) Por ser eletrônico, são instrumentos delicados, principalmente aqueles com indicação por ponteiro.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('189c5b58-7e15-486e-827d-ca6cbbf0f096', '543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'D) Ausência do risco de contaminação da peça a ser soldada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f91285ce-69ca-44d3-bb6d-84a8d2059c11', '543e6d61-ba76-44ac-b9d3-8b24e666eb77', 'E) Instrumento que apresenta uma precisão muito boa ao fim que se destina.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('4a1a6ef3-f4d6-4b64-90be-b5a88d0d0e6f', 'c5555555-5555-5555-5555-555555555555', 'Simbologia', 'Questões e atividades sobre Simbologia', 3, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '4a1a6ef3-f4d6-4b64-90be-b5a88d0d0e6f', 'Prática - Simbologia', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6b4cf6aa-be7b-4d4a-a49f-d188ef394d0d', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('275b981a-d073-4492-afc1-25534280e8c8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '6b4cf6aa-be7b-4d4a-a49f-d188ef394d0d', 'multiple_choice', 'Quanto às convenções estabelecidas pela norma AWS A2.4 (Símbolos para Soldagem e END), identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('591b7249-0a55-455d-9465-1acb5a05154c', '275b981a-d073-4492-afc1-25534280e8c8', 'F) Quando a linha de chamada é “quebrada”, isto significa que a mesma aponta para um membro específico da junta que deve ser chanfrado;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('60ad8c20-121d-4d67-a934-4f80cdd320bd', '275b981a-d073-4492-afc1-25534280e8c8', 'G) Referências tais como: número da EPS, indicação de processo de soldagem, quando se necessita fazer alguma observação importante, entre outras, todas essas informações devem ficar na cauda da seta;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('700a75bf-38b6-47ec-a1f3-2e9c3b23dc82', '275b981a-d073-4492-afc1-25534280e8c8', 'H) Todos os símbolos localizados abaixo da linha de referência correspondem a uma solda realizada no mesmo lado que a seta aponta;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6cb7e2ee-5f23-48a0-8f01-205fbf6b3a2d', '275b981a-d073-4492-afc1-25534280e8c8', 'I) Todos os símbolos localizados acima da linha de referência correspondem a uma solda realizada no lado oposto ao que a seta aponta;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c95fb66-411a-4a67-84f0-9f20867556ed', '275b981a-d073-4492-afc1-25534280e8c8', 'J) Os símbolos de solda em ângulo, soldas em chanfro “em meio V”, “em V”, “em J”, entre outros, são sempre indicados com uma perna perpendicular à linha de referência à direita do símbolo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1fe2c816-710f-4f9c-99e9-e469446a156a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('61093d8f-5fce-4397-81ef-1252672aba46', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '1fe2c816-710f-4f9c-99e9-e469446a156a', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page25_img1.png" width="100%" />\n\n<img src="/images/questions/page25_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('39015124-970a-4119-8283-d936d9ad2dc2', '61093d8f-5fce-4397-81ef-1252672aba46', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('47be1ee7-4b85-4131-9a2a-2a49ab643557', '61093d8f-5fce-4397-81ef-1252672aba46', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f76ee8dd-e1bc-41c9-acb8-2176f7d58aca', '61093d8f-5fce-4397-81ef-1252672aba46', 'C) C 26', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9b9af7dd-0cd4-41e4-8e9d-09d27829b9e2', '61093d8f-5fce-4397-81ef-1252672aba46', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('096f3ea3-ee7e-4d0c-aac8-f4b82a9db633', '61093d8f-5fce-4397-81ef-1252672aba46', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b3df252d-a6ac-46e4-944a-0bb0856286c7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2b364579-bc0a-404b-a581-d7e73a6cc07b', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b3df252d-a6ac-46e4-944a-0bb0856286c7', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page27_img1.png" width="100%" />\n\n<img src="/images/questions/page27_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a363c14-2574-497a-8521-e23c54b1ac11', '2b364579-bc0a-404b-a581-d7e73a6cc07b', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c06d243f-6b37-469b-a1bd-afca18f9b010', '2b364579-bc0a-404b-a581-d7e73a6cc07b', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('59262581-891b-48bb-bf54-4e7a71f9ac45', '2b364579-bc0a-404b-a581-d7e73a6cc07b', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('015ed705-27ca-4f78-acfe-40de386b376d', '2b364579-bc0a-404b-a581-d7e73a6cc07b', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f8d816cf-498e-4ddd-8223-715c5b6c6106', '2b364579-bc0a-404b-a581-d7e73a6cc07b', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c4fa13de-03ac-4120-acdc-cbd71a109f77', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d4bcbc81-1b24-4384-be40-5d8f790f3524', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'c4fa13de-03ac-4120-acdc-cbd71a109f77', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, identifique o croqui da junta correspondente. A B C D E \n\n<img src="/images/questions/page28_img1.png" width="100%" />\n\n<img src="/images/questions/page28_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dc362255-bd68-4abf-9089-99276b3497bd', 'd4bcbc81-1b24-4384-be40-5d8f790f3524', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7f350503-8b4f-45ff-b8fc-d3db5ebc78e1', 'd4bcbc81-1b24-4384-be40-5d8f790f3524', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('44632cc4-7d04-4d2a-a3c3-21712ef5ff8a', 'd4bcbc81-1b24-4384-be40-5d8f790f3524', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2333e3a3-5ff3-4736-a3fa-4ecb15f08d2c', 'd4bcbc81-1b24-4384-be40-5d8f790f3524', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d4e4e63-537a-4968-9453-8380448ae2d2', 'd4bcbc81-1b24-4384-be40-5d8f790f3524', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7823fbe7-85ef-470d-a685-a7cc1e0dde2a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e76cac7e-c8e9-4ff9-b125-869920785bcc', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7823fbe7-85ef-470d-a685-a7cc1e0dde2a', 'multiple_choice', 'Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Solda com perfil conve- xo B Solda em todo contorno C Solda no campo D Espaçador E Cobre-junta \n\n<img src="/images/questions/page30_img1.png" width="100%" />\n\n<img src="/images/questions/page30_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3cb962b2-dfe7-412d-a46f-46c162a9ae9f', 'e76cac7e-c8e9-4ff9-b125-869920785bcc', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c7567ac9-8662-4b5b-ab56-92291c2a38f2', 'e76cac7e-c8e9-4ff9-b125-869920785bcc', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1c794c8e-2b94-473d-8c6f-9b9a93690e2e', 'e76cac7e-c8e9-4ff9-b125-869920785bcc', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('001579dd-c3dc-48e9-b024-ffb1930ed061', 'e76cac7e-c8e9-4ff9-b125-869920785bcc', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9349086d-c059-44cf-b5c1-c8aaa2823d1a', 'e76cac7e-c8e9-4ff9-b125-869920785bcc', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('52b3f74c-c347-452a-a7aa-da2d6f3f724a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 6', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '52b3f74c-c347-452a-a7aa-da2d6f3f724a', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta.. A B C D E \n\n<img src="/images/questions/page31_img1.png" width="100%" />\n\n<img src="/images/questions/page31_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('93760219-f99a-4f80-bab9-9ed6449ccef1', '0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2aa29650-75b6-4871-b1d3-6009a45c6401', '0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4eeee4f3-5768-4d87-8d37-62e2ddb0478b', '0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4d1a37f-c849-4d07-8a3c-5e3b4ba26123', '0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cd0331b3-3ec0-46d9-96a6-d07742f09be2', '0aaa9c66-cf6a-4d4b-b727-c9692deeae2e', 'E) E', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1095cd22-faa8-44c0-81fa-97e15f82ec8c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 43', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bd36aa29-3099-40a4-b068-f0209e9fe866', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '1095cd22-faa8-44c0-81fa-97e15f82ec8c', 'multiple_choice', '09, sabendo-se que a solda em ângulo do lado esquerdo tem uma perna de solda igual a 7 mm e a solda de ângulo do lado direito tem uma perna igual a 5 mm. Os membros devem estar afastados um do outro 4 mm”. A B C D E \n\n<img src="/images/questions/page32_img1.png" width="100%" />\n\n<img src="/images/questions/page32_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('38a7012c-fd37-4f09-9f0f-0b5a17d1a205', 'bd36aa29-3099-40a4-b068-f0209e9fe866', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4f5c8386-4036-4bb9-888f-5c434ad89b73', 'bd36aa29-3099-40a4-b068-f0209e9fe866', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c499516-0aac-43cb-815c-8ddaa1f24058', 'bd36aa29-3099-40a4-b068-f0209e9fe866', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1390b026-7b0b-418b-b5d4-c2fdcf295984', 'bd36aa29-3099-40a4-b068-f0209e9fe866', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4af975f6-6ec5-4c14-b7d9-79b188040d93', 'bd36aa29-3099-40a4-b068-f0209e9fe866', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9dc19b8f-0696-4b7c-831c-68d97d5e4472', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('418abeb2-0dc0-484b-9d2a-a358854f4253', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '9dc19b8f-0696-4b7c-831c-68d97d5e4472', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta.. A B C D E \n\n<img src="/images/questions/page33_img1.png" width="100%" />\n\n<img src="/images/questions/page33_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bb148841-4db1-47cb-9340-b2a11f15e3bd', '418abeb2-0dc0-484b-9d2a-a358854f4253', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1af2f6c0-e646-4931-8104-775601c6e665', '418abeb2-0dc0-484b-9d2a-a358854f4253', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('af191f19-e0f9-4347-89c1-1bec657ddaed', '418abeb2-0dc0-484b-9d2a-a358854f4253', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c4d7deaf-4041-404a-8ac1-16ba5cec191b', '418abeb2-0dc0-484b-9d2a-a358854f4253', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e5541ad2-d90b-4e07-b784-adab878e4b2e', '418abeb2-0dc0-484b-9d2a-a358854f4253', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('53c9d57b-1d63-43b7-b5fc-b4459d056bf5', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 9', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e841f650-aff2-48f1-bcaf-365eac6936a2', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '53c9d57b-1d63-43b7-b5fc-b4459d056bf5', 'multiple_choice', 'De acordo com a junta de ângulo contendo soldas de pernas desiguais, identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page35_img1.png" width="100%" />\n\n<img src="/images/questions/page35_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a164df3-2dfc-4ad4-b93b-d5f19c061954', 'e841f650-aff2-48f1-bcaf-365eac6936a2', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c965f6f-fe30-4665-9e26-c0106db820ad', 'e841f650-aff2-48f1-bcaf-365eac6936a2', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d9f6c25b-960e-4d0d-8cd7-195e74115514', 'e841f650-aff2-48f1-bcaf-365eac6936a2', 'C) C 36', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('59588759-a227-4aa3-8625-d89bfacd982a', 'e841f650-aff2-48f1-bcaf-365eac6936a2', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a68b246d-1410-48aa-b80b-f8a38f1da1f6', 'e841f650-aff2-48f1-bcaf-365eac6936a2', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b2fd393a-f325-4351-a8a7-2e80f894d286', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 10', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b2fd393a-f325-4351-a8a7-2e80f894d286', 'multiple_choice', 'De acordo com a junta de ângulo apresentada a seguir identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page37_img1.png" width="100%" />\n\n<img src="/images/questions/page37_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('756b4918-f52a-4568-853e-b64e8b178816', 'b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('222b045a-d9b0-4c28-8942-c70ac9ce8feb', 'b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4bf83a2-4615-4dad-833e-c0a9f4407df0', 'b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88d31fbc-6582-4dc4-983e-fcf324291221', 'b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('147324ae-e673-4bf1-a18b-7e6a3290700d', 'b83a7401-cb25-42a9-be6d-1eb93a4154b1', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cca91aee-af9c-4048-9454-8c298e06b748', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 11', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'cca91aee-af9c-4048-9454-8c298e06b748', 'multiple_choice', 'De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page38_img1.png" width="100%" />\n\n<img src="/images/questions/page38_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('825542c7-541a-48fa-a97a-760e1a558127', 'fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('04196f89-9650-4bf0-9c31-4b6e1b6e7a71', 'fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33acd931-f3cf-4cb8-9881-a8504904130f', 'fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0cb04f2-8831-4d26-b813-d843142a714d', 'fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f39bf895-d9c3-4452-a3d8-61fba00156bc', 'fc2ea377-ff3e-4da6-9316-0f5e57b784bc', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f8bde08c-2374-4c24-8d7f-7f77b9207f2a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 12', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('24b20fa1-e448-4961-b779-7298ba5924cf', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'f8bde08c-2374-4c24-8d7f-7f77b9207f2a', 'multiple_choice', 'De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta. A B C D E \n\n<img src="/images/questions/page39_img1.png" width="100%" />\n\n<img src="/images/questions/page39_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21258d10-4bbc-4190-8aa2-91cd8604c12e', '24b20fa1-e448-4961-b779-7298ba5924cf', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a65a71c6-c5c9-4986-94d5-5ba24e0dd00a', '24b20fa1-e448-4961-b779-7298ba5924cf', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06bb15a2-92ee-468d-a1c1-188073a01df6', '24b20fa1-e448-4961-b779-7298ba5924cf', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('09b8297c-ccee-4417-bd40-ec5804b8f8fa', '24b20fa1-e448-4961-b779-7298ba5924cf', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('520b9193-8f67-4dc6-8d20-2b18bf0c80c4', '24b20fa1-e448-4961-b779-7298ba5924cf', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e6c8c48a-84c7-410b-a01e-994dd32c4210', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 13', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9517c2e5-d3a1-41c4-9885-2c5065dca299', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'e6c8c48a-84c7-410b-a01e-994dd32c4210', 'multiple_choice', 'De acordo com o croqui da junta de ângulo e a simbologia apresentados a seguir, informe o valor da face da raiz do membro chanfrado. \n\n<img src="/images/questions/page41_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e1a38694-e5ec-4197-a0f3-2fa84c0b1d78', '9517c2e5-d3a1-41c4-9885-2c5065dca299', 'A) 2 mm', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e72bd816-005e-4d8a-b50c-6b72c77b14e4', '9517c2e5-d3a1-41c4-9885-2c5065dca299', 'B) 3 mm', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8695bcdf-2e6e-4d46-9d47-a3471b918c0b', '9517c2e5-d3a1-41c4-9885-2c5065dca299', 'C) 4 mm', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8911032f-08b6-4815-88db-987daad10bf8', '9517c2e5-d3a1-41c4-9885-2c5065dca299', 'D) 5 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('342afd63-177e-4097-a8d3-2f443bee86ea', '9517c2e5-d3a1-41c4-9885-2c5065dca299', 'E) 0 mm', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('dd993d29-6a73-4450-a5e6-46998110ac5f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 14', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('26995439-772a-42fa-9b20-5a0e8a679ffa', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'dd993d29-6a73-4450-a5e6-46998110ac5f', 'multiple_choice', 'Qual seria a simbologia correta para a situação descrita a seguir: Necessita-se soldar uma junta de topo, solda em chanfro, chanfro em “V”, ângulo do chanfro igual 60º, abertura de raiz igual a 3 mm, posição de soldagem sobre-cabeça. Após esta soldagem, deve ser realizada uma goivagem pelo lado oposto da solda empregando o processo “eletrodo de carvão”. Solicita-se que, em seguida, seja realizada uma inspeção usando a técnica “Partícula Magnética” para detecção de falhas na região da raiz da solda.. O chanfro, resultante da goivagem, deve ser preenchido, devendo o reforço desta solda ser nivelado com a superfície da chapa. Concluindo a soldagem, um ensaio radiográfico deve ser realizado pelo lado superior da obra, devendo cobrir 75% de toda a junta, empregando o procedimento Rad043/00 para a realização deste ensaio. 43 A B C D E ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ca6dcc59-4a9e-4bfe-ba29-9b5bdc0c36fb', '26995439-772a-42fa-9b20-5a0e8a679ffa', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('056ab9dc-6d5b-4505-af41-89e88e5c3cf0', '26995439-772a-42fa-9b20-5a0e8a679ffa', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5d10e538-4ff7-4d0a-8335-18f1c8060165', '26995439-772a-42fa-9b20-5a0e8a679ffa', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a04981d-c9e5-4add-b1c7-0d3833eb5589', '26995439-772a-42fa-9b20-5a0e8a679ffa', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('27c72aa4-28b4-4268-9f8f-7c9aa4b560a6', '26995439-772a-42fa-9b20-5a0e8a679ffa', 'E) E 44', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ac995f8a-fe21-4f37-ac62-7240c1cb7b62', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 15', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0d84cb50-1f58-487a-8018-b3626a1cfe65', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ac995f8a-fe21-4f37-ac62-7240c1cb7b62', 'multiple_choice', 'Analisando as simbologias referentes aos Ensaios Não Destrutivos, identifique a alternativa correta. A B  Ensaio por Partícula Magnética a ser realizado pelo lado da seta;  Ensaio Radiográfico, empregando filme com comprimento igual a 100 mm; C D  Ensaio por Ultrassom a ser realizado pelo lado oposto ao da seta, em todo o contorno da peça;  Ensaio de Líquido Penetrante a ser realizado do lado da seta, em 50% da extensão soldada; E  Ensaio por Partícula Magnética a ser realizado pelo lado oposto ao da seta; em 90% da extensão soldada; \n\n<img src="/images/questions/page45_img1.png" width="100%" />\n\n<img src="/images/questions/page45_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1881f5bb-2a8c-4932-a49b-70c56dc682c9', '0d84cb50-1f58-487a-8018-b3626a1cfe65', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6b204065-65e5-41f5-8ffe-e77e020d51fa', '0d84cb50-1f58-487a-8018-b3626a1cfe65', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9b668e2c-8989-4a14-abfc-1a2aee550ec5', '0d84cb50-1f58-487a-8018-b3626a1cfe65', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c5caa607-074b-4f91-8779-dfeb93872df0', '0d84cb50-1f58-487a-8018-b3626a1cfe65', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f012a502-eede-4466-8968-9fb13690839c', '0d84cb50-1f58-487a-8018-b3626a1cfe65', 'E) E 46', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('854f4b67-8c19-4bce-be9c-95726cb6c7a8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 16', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '854f4b67-8c19-4bce-be9c-95726cb6c7a8', 'multiple_choice', 'Analisando as simbologias referentes aos Ensaios Não Destrutivos, identifique a alternativa correta. A B - Ensaio por Partícula Magnética em ambos os lados da peça: do lado oposto à seta, deve ser realizado ensaio em 100% da extensão soldada; do lado onde está indicando a seta, deve ser realizado o teste em 100mm da extensão soldada ; - Ensaio por Ultrassom a ser realizado pelo do lado da seta, em 20% da extensão soldada; C D - Ensaio Visual a ser realizado do lado da seta em toda extensão soldada e Ensaio de Partícula Magnética a ser realizado do lado oposta à seta em 50% da extensão soldada ; - Ensaio de Teste por Pontos a ser realizado do lado da seta, devendo ser usado o procedimento de No. 4/00 para a realização da tarefa. E - Ensaio por Ultrassom realizado em 47 ambos os lados da seta. O ensaio tem que ser realizado no interior do Setor de Fabricação. \n\n<img src="/images/questions/page46_img1.png" width="100%" />\n\n<img src="/images/questions/page46_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24f6b877-4310-454c-9963-7fc0c4dacbb0', 'c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('594edd12-6ea5-4fa9-b90f-5b424f728b73', 'c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c964b229-3b6e-4db9-b29c-914d29b51552', 'c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ac5350fc-1ba3-49b3-a6c7-502f4824ebf1', 'c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3001ca25-19e7-4f9f-834d-ee2a99e56b32', 'c4b6099a-fb66-4b56-9458-372c3b06eb6c', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7f80d5a0-f30a-442b-b64f-d345b97b6d00', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 17', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7f80d5a0-f30a-442b-b64f-d345b97b6d00', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, informe a espessura \n\n<img src="/images/questions/page47_img1.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b28eef5f-e842-48f8-9be5-df55436065b1', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'T) da peça localizada no plano vertical.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef1029ee-b92e-480c-9862-22c83cd4b3e4', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'A) T = 10 mm', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e317a873-6596-4aa7-9dc4-337d37c58f67', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'B) T = 11 mm', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6b6b81a3-b3d7-4ca0-8571-e185712c7853', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'C) T = 12 mm', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('760e4a72-c0b5-4605-a8fd-5ea91f1c911c', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'D) T = 13 mm', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b92bca69-4451-4f0f-94b3-90fca6c6fcf3', '8a5c642f-db23-467d-9bab-ae1ebb579fd1', 'E) T = 25 mm', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d0d65edc-6261-4460-b232-54084dba4a56', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 18', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('23a81bc0-5951-4907-9426-30de83d8ccb1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'd0d65edc-6261-4460-b232-54084dba4a56', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, informe a junta soldada apresentada a seguir. A B C D 49 E \n\n<img src="/images/questions/page48_img1.png" width="100%" />\n\n<img src="/images/questions/page48_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a85543c4-a848-4caf-a585-7406742ce2e2', '23a81bc0-5951-4907-9426-30de83d8ccb1', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be2585ad-ce18-4f8c-b312-5f36a9159850', '23a81bc0-5951-4907-9426-30de83d8ccb1', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1a49200a-dce9-44ae-b06b-566d181dbe51', '23a81bc0-5951-4907-9426-30de83d8ccb1', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db8b9fa4-6772-4754-a99c-9cef4d7d09c5', '23a81bc0-5951-4907-9426-30de83d8ccb1', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0512e431-6b23-4b72-9076-606d8d0a02bb', '23a81bc0-5951-4907-9426-30de83d8ccb1', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e8186930-a281-4a8e-ac4a-c25b7e55d165', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 19', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('372530de-66b6-402b-a976-611127a87df2', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'e8186930-a281-4a8e-ac4a-c25b7e55d165', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, informe a junta soldada apresentada a seguir. 51 A B C D E 52 \n\n<img src="/images/questions/page50_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63182b6f-680c-45db-8d21-29b62c1bb1b7', '372530de-66b6-402b-a976-611127a87df2', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4441d2a4-868f-4fda-8d77-1557ff9847bf', '372530de-66b6-402b-a976-611127a87df2', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('23b8377f-3cac-4a2d-8702-a12032599aee', '372530de-66b6-402b-a976-611127a87df2', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a8bd3f06-9408-4290-aa42-f7265760bc7d', '372530de-66b6-402b-a976-611127a87df2', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef8d1693-6c1a-41c1-ba43-464bf1eade37', '372530de-66b6-402b-a976-611127a87df2', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('045b8e5a-07d9-40c1-a29d-e77c49debb4e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 20', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('05a39a3b-41d2-49de-b647-b799d6907bee', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '045b8e5a-07d9-40c1-a29d-e77c49debb4e', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, identifique a junta soldada apresentada a seguir. A B C D E \n\n<img src="/images/questions/page53_img1.png" width="100%" />\n\n<img src="/images/questions/page53_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7495ba2d-c84f-4860-9586-71652a131704', '05a39a3b-41d2-49de-b647-b799d6907bee', 'A) A 54', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('59b8db40-d739-4f08-a022-89493d389d9a', '05a39a3b-41d2-49de-b647-b799d6907bee', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12a4e44d-62a3-4e85-91f3-a30e9b870073', '05a39a3b-41d2-49de-b647-b799d6907bee', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('369c0fe3-4f4e-4262-8015-e407ad2c0d1e', '05a39a3b-41d2-49de-b647-b799d6907bee', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('685f25aa-fc02-4b1d-925e-28132208d014', '05a39a3b-41d2-49de-b647-b799d6907bee', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('63521981-fefa-40d2-981a-96d498c3786b', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 22', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0be9814a-46fb-4c49-9ef9-3bb424370c78', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '63521981-fefa-40d2-981a-96d498c3786b', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D E 57 \n\n<img src="/images/questions/page56_img1.png" width="100%" />\n\n<img src="/images/questions/page56_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f396eeb8-d2ed-4eb9-b6cf-9adeff736039', '0be9814a-46fb-4c49-9ef9-3bb424370c78', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c8aa13d5-7a50-4590-aa10-154e73ee1ac8', '0be9814a-46fb-4c49-9ef9-3bb424370c78', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6265983e-1b19-4fff-9148-c6f6944fa726', '0be9814a-46fb-4c49-9ef9-3bb424370c78', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2ff0ffb8-bd33-4738-8fda-c5f5ed7ae8f2', '0be9814a-46fb-4c49-9ef9-3bb424370c78', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('75eb15b3-c657-4ca4-b975-29cac3c61e4e', '0be9814a-46fb-4c49-9ef9-3bb424370c78', 'E) E', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('00284f0d-cd29-4c8f-a333-ce73e7057b3f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 23', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '00284f0d-cd29-4c8f-a333-ce73e7057b3f', 'multiple_choice', 'De acordo com a junta de topo apresentada a seguir, identifique a simbologia correta.. A B C D E 59 \n\n<img src="/images/questions/page58_img1.png" width="100%" />\n\n<img src="/images/questions/page58_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a6231dd1-eb23-425a-8885-4ed9af54ef11', '7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6de583a5-52c9-4e30-89a7-87eb343d7a02', '7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('750cd6ce-460f-48f9-8d07-99d00e3e9805', '7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4820e17-36ba-4347-a79a-3e1168ff5a51', '7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('80ae1ecf-ba4b-43a0-a070-bce4e642a441', '7cdb4994-3ec6-4773-b70f-49fdedc7cd4f', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('aadb7c8f-2bad-41ce-a020-2249f7c5c4aa', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 24', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'aadb7c8f-2bad-41ce-a020-2249f7c5c4aa', 'multiple_choice', 'Qual seria a simbologia correta para a situação descrita a seguir: Necessita-se soldar uma junta de topo, utilizando a técnica unilateral com backing de cerâmica. Chanfro em “V”, ângulo do bisel igual a 40º, abertura de raiz igual a 7 mm, posição de soldagem plana. Solicita-se que, em seguida à soldagem, seja realizada uma inspeção usando a técnica “Partícula Magnética” em uma extensão equivalente a 50% do comprimento da junta para a detecção de falhas na região da raiz da solda.. Após o envio da peça, onde se encontra esta junta, para o campo, deve-se realizar um ensaio radiográfico, executado pelo lado da raiz da solda, empregando o procedimento no. 10/08. 60 A B C D E ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('634b6247-658e-4cbf-88c9-8e01477a7759', 'd1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('53ce853f-044d-4630-8c05-87d12b779189', 'd1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1640f0ef-d8c7-4480-bf98-b55069865880', 'd1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65081e4d-aa1d-4c4a-b3c1-f72d36ccb3f4', 'd1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3b3a7449-7180-43e3-919d-9710c3c1ed43', 'd1df2ccd-eefb-492c-8b3c-f7813f1ac2ee', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('23c341cc-c4fe-4084-8393-f0dd7c3152ec', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 50', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '23c341cc-c4fe-4084-8393-f0dd7c3152ec', 'multiple_choice', 'da extensão soldada; E - Ensaio por Ultrassom realizado em ambos os lados da seta. O ensaio deverá ser realizado no campoo. \n\n<img src="/images/questions/page61_img1.png" width="100%" />\n\n<img src="/images/questions/page61_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9e60dd5-e059-4a28-9e53-484fb6baab68', '3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('de0d7d6d-4b07-46e3-b65f-227f8cce9dbc', '3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'B) B 62', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6dcb095f-d2eb-4c2b-bc26-0fdea0663f43', '3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('90f05311-1645-4750-971a-b75c3935f992', '3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06edc721-e8f7-4dd3-b95b-92d35826d20d', '3afdb46a-7ddc-409d-9aea-aeb6fa82481c', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c5af3a96-2424-4003-981d-ef37fd5b2aea', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 26', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('947473d3-fe74-486b-b948-1a8d0c08ef04', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'c5af3a96-2424-4003-981d-ef37fd5b2aea', 'multiple_choice', 'De acordo com o croqui apresentado a seguir, identifique a simbologia correta. A B C D 63 E \n\n<img src="/images/questions/page62_img1.png" width="100%" />\n\n<img src="/images/questions/page62_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58153f53-f800-441a-8900-df2067530e96', '947473d3-fe74-486b-b948-1a8d0c08ef04', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e02c80c-80fd-4e09-a4b0-3de87da2e9fa', '947473d3-fe74-486b-b948-1a8d0c08ef04', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb616e80-eb41-489c-8380-d7ef0281f137', '947473d3-fe74-486b-b948-1a8d0c08ef04', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bb9337db-a72b-4811-8885-3bd5a1234e91', '947473d3-fe74-486b-b948-1a8d0c08ef04', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('609b3d9a-580d-4abf-8b74-8647b28a1133', '947473d3-fe74-486b-b948-1a8d0c08ef04', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b16be02b-14f4-409f-9c59-9c15fc41c893', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 27', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b7aec36c-8bff-4d24-97e8-548bf1527da3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b16be02b-14f4-409f-9c59-9c15fc41c893', 'multiple_choice', 'De acordo com a junta de ângulo, identifique a simbologia correta. A B C D E 65 \n\n<img src="/images/questions/page64_img1.png" width="100%" />\n\n<img src="/images/questions/page64_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('73e369dc-00bb-4044-be7c-be98b315228b', 'b7aec36c-8bff-4d24-97e8-548bf1527da3', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd0ffb3e-94f9-4de4-91b5-aec06037c134', 'b7aec36c-8bff-4d24-97e8-548bf1527da3', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('71b7e02c-590e-431f-9aad-4159c4e1c983', 'b7aec36c-8bff-4d24-97e8-548bf1527da3', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3a3f2bee-d9a2-447e-a53a-26ae28017a29', 'b7aec36c-8bff-4d24-97e8-548bf1527da3', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3aa1d15d-38eb-49c4-9e0c-caa808dc1521', 'b7aec36c-8bff-4d24-97e8-548bf1527da3', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('fb27c636-009b-4e5f-9f6a-11f6c6450d91', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 28', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d540ebb0-d7d1-4fad-8b81-0e0a02031228', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'fb27c636-009b-4e5f-9f6a-11f6c6450d91', 'multiple_choice', 'De acordo com a peça soldada apresentada no croqui abaixo, identifique a simbologia correta. A B C D E 67 \n\n<img src="/images/questions/page66_img1.png" width="100%" />\n\n<img src="/images/questions/page66_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db4ec9c1-12e9-4d33-8f64-4932a7a6d442', 'd540ebb0-d7d1-4fad-8b81-0e0a02031228', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9999d953-a244-4e55-a24a-621c1c45de5d', 'd540ebb0-d7d1-4fad-8b81-0e0a02031228', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ec61cec5-c8f7-44de-b5d9-4863df7d573d', 'd540ebb0-d7d1-4fad-8b81-0e0a02031228', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8e689289-52de-41e7-b447-fa9aa5709e4d', 'd540ebb0-d7d1-4fad-8b81-0e0a02031228', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7e299d72-216f-422e-87f2-7ac518caa5a8', 'd540ebb0-d7d1-4fad-8b81-0e0a02031228', 'E) E', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2676d5ee-d2f3-44a7-a32d-4756a72ba0b8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 29', 'Resolva a questão', 28)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2239530a-400f-4967-9aaf-1ff9792eeea3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '2676d5ee-d2f3-44a7-a32d-4756a72ba0b8', 'multiple_choice', 'De acordo com a peça soldada apresentada no croqui abaixo, identifique a simbologia correta. A B C D E 69 \n\n<img src="/images/questions/page68_img1.png" width="100%" />\n\n<img src="/images/questions/page68_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('490778f9-f796-488d-bb94-c04e2026fe08', '2239530a-400f-4967-9aaf-1ff9792eeea3', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d156f6cb-d044-4b12-ac2f-f24a9b29e866', '2239530a-400f-4967-9aaf-1ff9792eeea3', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a49e48b-cd36-44d8-b7cc-625dafc2b99e', '2239530a-400f-4967-9aaf-1ff9792eeea3', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c8c15713-323d-4eac-ba7d-c1fc12ed2a6b', '2239530a-400f-4967-9aaf-1ff9792eeea3', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bec35a9e-f911-4839-a2e1-ad630ae1ec7f', '2239530a-400f-4967-9aaf-1ff9792eeea3', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a5a05d69-8c9a-4794-bcc0-c9f33ed7dbfc', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 30', 'Resolva a questão', 29)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('34936c8d-fbd4-430a-9549-d01dee44bfd4', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'a5a05d69-8c9a-4794-bcc0-c9f33ed7dbfc', 'multiple_choice', 'De acordo com a peça soldada apresentada no croqui abaixo (viga do tipo I soldada em uma base metálica), identifique a simbologia correta. 71 A B C D E 72 \n\n<img src="/images/questions/page70_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('852377ca-f0d5-4d95-a69a-e1c255692912', '34936c8d-fbd4-430a-9549-d01dee44bfd4', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('199244b1-fab4-440c-b757-edf3d338c588', '34936c8d-fbd4-430a-9549-d01dee44bfd4', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b9edcc77-21e4-4407-8344-80b6a419c467', '34936c8d-fbd4-430a-9549-d01dee44bfd4', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('367a06c4-8409-4afb-a45d-c842836cdf25', '34936c8d-fbd4-430a-9549-d01dee44bfd4', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b9708131-4bf7-4af3-a997-ea2c1dea4a4c', '34936c8d-fbd4-430a-9549-d01dee44bfd4', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('28a038f8-5ad3-412f-9ba2-4242c38516e4', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 31', 'Resolva a questão', 30)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '28a038f8-5ad3-412f-9ba2-4242c38516e4', 'multiple_choice', 'De acordo com a peça soldada apresentada no croqui abaixo (cantoneira posicionada à 45º de uma chapa de aço) e sabendo que a solda de ângulo localizada à esquerda tem uma perna de solda igual a 5 mm e que a solda da direita tem uma perna igual a 6 mm, identifique a simbologia correta. A B C D E 74 \n\n<img src="/images/questions/page73_img1.png" width="100%" />\n\n<img src="/images/questions/page73_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4f7a1ae8-a504-4d57-b6bc-c5998535c7fa', 'f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aa20aa7f-0e79-46fb-95d5-922838fce555', 'f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6abb557f-e442-46b2-a79e-d95abd8a116f', 'f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7c0656c4-56fe-4953-ae00-3ceb22bac64c', 'f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('551a1c8f-7f5b-4dc6-80bd-c62dec8d3fd5', 'f4a04be6-1b35-4a79-b8b5-e26d965bcec1', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('39a6d7ec-11b9-4a20-8443-c0aafa3ce60f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 32', 'Resolva a questão', 31)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2b8208de-d35b-41bf-8d86-b9495f239fe3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '39a6d7ec-11b9-4a20-8443-c0aafa3ce60f', 'multiple_choice', 'De acordo com a junta de topo apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 76 \n\n<img src="/images/questions/page75_img1.png" width="100%" />\n\n<img src="/images/questions/page75_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('39153d45-d592-4bc8-b53e-8e913bbba2dd', '2b8208de-d35b-41bf-8d86-b9495f239fe3', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8ade64b3-db94-4a32-81f2-c58942bd12d2', '2b8208de-d35b-41bf-8d86-b9495f239fe3', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('894c92fa-faaf-4eca-836f-3a9edf00dd86', '2b8208de-d35b-41bf-8d86-b9495f239fe3', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48d7a2f5-8e59-49c3-8b84-8dc11f50778e', '2b8208de-d35b-41bf-8d86-b9495f239fe3', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6d7b3a04-652f-4fc7-9f83-c59876a6a95d', '2b8208de-d35b-41bf-8d86-b9495f239fe3', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1032c4a4-2b28-48a0-a44a-1afb1b144664', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 33', 'Resolva a questão', 32)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '1032c4a4-2b28-48a0-a44a-1afb1b144664', 'multiple_choice', 'Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Solda de revestimento B Solda em todo o contorno C Solda de fechamento ou aresta D Solda de costura E Solda com projeção \n\n<img src="/images/questions/page77_img1.png" width="100%" />\n\n<img src="/images/questions/page77_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9f78dd3a-4c0d-4341-ad05-3816eda81d98', '9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('507f7edc-989b-47ee-9aa0-246b393c2765', '9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a7ac08cc-ebc2-4722-a961-85ce805c54c6', '9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('048dcf22-e874-45b0-9cb5-ece57dee27de', '9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a62a3495-f11c-4c79-b3de-4fbca86ba56b', '9c973ecc-c1c0-41fa-adfc-98357be6ad16', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('52b455ed-0b51-4e8b-9d2d-fdcdd3ccd6c1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 35', 'Resolva a questão', 33)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '52b455ed-0b51-4e8b-9d2d-fdcdd3ccd6c1', 'multiple_choice', 'De acordo com a junta de topo apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 81 \n\n<img src="/images/questions/page80_img1.png" width="100%" />\n\n<img src="/images/questions/page80_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a531240-6676-443c-8899-b756fd251c1b', 'e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45951224-d308-4143-ac36-7f12aef8620b', 'e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7711a1cb-db6f-4cf9-9481-4bc871a474fd', 'e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4eafb257-105b-4c9c-ace3-fc186d47c537', 'e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7a825e19-10f5-418e-9bfa-8400a927fb31', 'e8e0a5d8-570b-453e-87c2-8e48a82f5982', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e738edc4-3ad9-4878-9289-16263de98f1e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 36', 'Resolva a questão', 34)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('48f5a89f-ae58-472d-a422-d75c4fb539db', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'e738edc4-3ad9-4878-9289-16263de98f1e', 'multiple_choice', 'De acordo com a simbologia apresentada a seguir, identifique a junta soldada apresentada a seguir. 83 A B C D E \n\n<img src="/images/questions/page82_img1.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dbcb8986-04a3-4eb0-879a-6930d36bdb23', '48f5a89f-ae58-472d-a422-d75c4fb539db', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b66d4b9c-db19-4c57-8fe4-6a5f8cb2c82b', '48f5a89f-ae58-472d-a422-d75c4fb539db', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('859b066c-cceb-4df5-86b9-9ea4cecc3c52', '48f5a89f-ae58-472d-a422-d75c4fb539db', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65ef9ba1-48d0-46ac-9d78-801ec50f3ca9', '48f5a89f-ae58-472d-a422-d75c4fb539db', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb0692fe-edf6-49f6-822c-69eff903acda', '48f5a89f-ae58-472d-a422-d75c4fb539db', 'E) E 84', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('884a7c35-15b3-4cb4-91be-c35c940bb1ff', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 37', 'Resolva a questão', 35)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a9e80b66-8b44-4525-870f-d7b839398b32', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '884a7c35-15b3-4cb4-91be-c35c940bb1ff', 'multiple_choice', 'Dos diferentes tipos de Símbolos Suplementares criados pela norma AWS A2.4, identifique a alternativa incorreta. Símbolo Significado A Chanfro em “U” B Solda com perfil côncavo C Solda com faces côncavas D Solda com perfil convexo E Chanfro em “J” \n\n<img src="/images/questions/page84_img1.png" width="100%" />\n\n<img src="/images/questions/page84_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b6ddd63c-473b-402b-9f90-ce3354cf1358', 'a9e80b66-8b44-4525-870f-d7b839398b32', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e64218ae-cc92-4c5f-b276-d6024d226f3e', 'a9e80b66-8b44-4525-870f-d7b839398b32', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0dc1ec4b-4e22-449b-9823-576379b27d3f', 'a9e80b66-8b44-4525-870f-d7b839398b32', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c811c28-cd4b-4b33-b5c8-a84867f7aa78', 'a9e80b66-8b44-4525-870f-d7b839398b32', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3cdad1b9-2817-46ae-8ee3-a23ce2a1b7d0', 'a9e80b66-8b44-4525-870f-d7b839398b32', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('938b74fc-cf36-4e0f-a440-63fc29febaad', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 38', 'Resolva a questão', 36)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '938b74fc-cf36-4e0f-a440-63fc29febaad', 'multiple_choice', 'De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 86 \n\n<img src="/images/questions/page85_img1.png" width="100%" />\n\n<img src="/images/questions/page85_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0b9ea90-bebe-4b3f-a4bc-87e6d397b7fe', 'd982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d3ee297-9a9c-421d-875e-1c4bf3e505ab', 'd982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3518b613-4626-4d83-87c9-302e453f5ac4', 'd982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('50a98d98-8ff7-49b3-9ae9-2a0056a51a50', 'd982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d6e66de8-3aa7-4c53-8b64-9a816a78ba20', 'd982cfc3-9cd5-4efb-8808-d1ab98e0fa56', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('caafa1a3-6983-43d2-ae00-1fa6a2d29a12', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 39', 'Resolva a questão', 37)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'caafa1a3-6983-43d2-ae00-1fa6a2d29a12', 'multiple_choice', 'De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D E 88 \n\n<img src="/images/questions/page87_img1.png" width="100%" />\n\n<img src="/images/questions/page87_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd5036e6-b13a-40a5-94fd-ee0ff1d4b2fc', 'e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5baa522d-58bd-40db-8fea-c462e1d594d9', 'e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('415b74c3-ea1a-43b5-ba3d-c66ab3238c72', 'e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cccdcc22-3764-4dc0-aa06-8ebe0fefc590', 'e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c2e1fe2a-50de-411f-b9ac-3875133a3243', 'e10875a0-b99a-4d59-a18a-e5bf741a27b6', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('de78d8bd-3c46-4ff5-b55a-9505eb23abab', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 40', 'Resolva a questão', 38)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'de78d8bd-3c46-4ff5-b55a-9505eb23abab', 'multiple_choice', 'De acordo com a junta apresentada no croqui a seguir, identifique a simbologia correta. A B C D 90 E \n\n<img src="/images/questions/page89_img1.png" width="100%" />\n\n<img src="/images/questions/page89_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4f0d343-914f-4c40-8e72-ca919ec0de3f', '94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0526e64e-4dea-448a-b3ae-644551dad73d', '94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'B) B', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48be6ddb-60af-487a-9485-56e5d3cbf3f9', '94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('28b0b8d0-e610-4544-86ca-7358a16d9d9e', '94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b9821593-b64e-4ddb-9ed9-d41fdbc7d128', '94fbfd9c-e4ad-401b-b044-1c889ca3c213', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('43eecd71-7481-4354-93f0-af317a0f8adb', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 2', 'Resolva a questão', 39)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d74f4704-c12a-4e34-91e9-a1fa0d537258', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '43eecd71-7481-4354-93f0-af317a0f8adb', 'multiple_choice', 'Quanto às características elétricas relativas ao processo de soldagem manual com eletrodo revestido, identifique a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d329d0e-c1c2-4e9a-9805-85d41abbdc0d', 'd74f4704-c12a-4e34-91e9-a1fa0d537258', 'A) Este processo permite apenas do uso das seguintes fontes de energia: transformador e gerador;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa82c79a-d741-4187-9399-d39327b47673', 'd74f4704-c12a-4e34-91e9-a1fa0d537258', 'B) Em relação aos tipos de corrente possíveis de serem usadas neste processo, a corrente elétrica do tipo contínua, com o eletrodo ligado no pólo negativo da fonte, não é possível ser utilizada;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('71f9330a-4b2c-4b75-b460-97d2efc3c717', 'd74f4704-c12a-4e34-91e9-a1fa0d537258', 'C) É proibido o uso da polaridade direta neste processo;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2973dc28-2d9c-4a87-8c5e-76e3e1b7ac8d', 'd74f4704-c12a-4e34-91e9-a1fa0d537258', 'D) Apesar de alguns eletrodos revestidos só poderem ser usados com um determinado tipo de corrente, este processo permite o emprego de qualquer corrente e polaridade;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1ef2ff4e-3ba1-4143-af33-5483edbcae15', 'd74f4704-c12a-4e34-91e9-a1fa0d537258', 'E) Eletrodos revestidos, quando empregados com corrente alternada, produzem os cordões de solda com as maiores penetrações, se comparados com os cordões fabricados com corrente contínua, estando o consumível ligado ao pólo positivo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9c39b58b-f43d-4a97-8b0a-ab45a9993764', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 3', 'Resolva a questão', 40)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('58acbc79-e374-4c13-a6d4-83dbc9271e87', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '9c39b58b-f43d-4a97-8b0a-ab45a9993764', 'multiple_choice', 'Em relação aos equipamentos de soldagem utilizados no processo de soldagem manual com eletrodo revestido, assinale a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e54a0a2-cccd-4ad9-ac8f-236839ffd8fc', '58acbc79-e374-4c13-a6d4-83dbc9271e87', 'A) Os cabos de soldagem devem ser mantidos desenrolados durante a soldagem, visto que este fato pode gerar um campo magnético com uma determinada magnitude, que por sua vez poderá defletir o arco elétrico durante a soldagem, produzindo uma grande quantidade de descontinuidades na junta soldada; 92', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bd1f4603-65c9-439c-a95e-349b5cf411ac', '58acbc79-e374-4c13-a6d4-83dbc9271e87', 'B) A conexão do grampo, tanto com a extremidade do cabo-terra, quanto a sua fixação com a obra, deve estar muito bem firme, visto que qualquer falha numa das partes tornará o arco elétrico instável, podendo gerar diferentes tipos de descontinuidades na junta soldada;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f93cb727-a525-4420-af16-13a90ede72b7', '58acbc79-e374-4c13-a6d4-83dbc9271e87', 'C) Uma das desvantagens deste processo é a limitação de suas fontes de energia em só poderem ser alimentadas por corrente elétrica e tensão provenientes de uma rede elétrica externa.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('de180b88-09d4-4cae-b6ef-1b0a529e0344', '58acbc79-e374-4c13-a6d4-83dbc9271e87', 'D) Os dispositivos que compõem o porta-eletrodo devem ser muito bem conservados, visto que avarias, além de diminuírem sua vida útil, podem também causar acidentes ao soldador, assim como gerar instabilidades no arco elétrico, que, por sua vez, poderá produzir descontinuidades na junta soldada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88cdba05-e953-4781-8478-f888cf9c435b', '58acbc79-e374-4c13-a6d4-83dbc9271e87', 'E) Os cabos devem ser flexíveis para permitir fácil manipulação e consistem de vários fios de cobre enrolados juntos e protegidos por um revestimento isolante e flexível (normalmente borracha sintética).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e62a8fcf-e8cb-429f-9fe1-23a806fbc289', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 4', 'Resolva a questão', 41)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bd71f006-ab54-4506-89fc-abb4cff6a092', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'e62a8fcf-e8cb-429f-9fe1-23a806fbc289', 'multiple_choice', 'Analisando o processo de soldagem manual com eletrodo revestido, assinale a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24e72b09-ad9d-473d-a301-1b8daf43811b', 'bd71f006-ab54-4506-89fc-abb4cff6a092', 'A) Pode ser usado numa ampla variedade de configurações de juntas encontradas na soldagem industrial;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0b254a8-996f-4901-8174-6b1d0e54116d', 'bd71f006-ab54-4506-89fc-abb4cff6a092', 'B) Processo que permite o soldador regular os valores de corrente elétrica e tensão do arco (voltagem), de acordo com a espessura do metal de base, do diâmetro do consumível, entre outros fatores;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ab2200fc-8dff-4d5b-bd9d-408e0e935a1f', 'bd71f006-ab54-4506-89fc-abb4cff6a092', 'C) Processo que permite soldar em todas as posições;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('54416163-1381-484d-9a8f-86781a4f594f', 'bd71f006-ab54-4506-89fc-abb4cff6a092', 'D) Pode ser usado numa ampla variedade de combinações de metal de base e metal de adição;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('024b6c0f-33ed-4d98-b09a-c39e14648d37', 'bd71f006-ab54-4506-89fc-abb4cff6a092', 'E) Este processo é muito usado na indústria, devido à simplicidade de sua fonte de energia, à qualidade das soldas e do baixo custo dos equipamentos de soldagem e dos consumíveis.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2d06507e-a771-49ed-a54a-15e17403eaf3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 5', 'Resolva a questão', 42)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5ad507b8-8291-485a-a8ad-ef45a364e213', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '2d06507e-a771-49ed-a54a-15e17403eaf3', 'multiple_choice', 'Analisando os processos de soldagem listados a seguir, identifique aquele que está fora do conjunto. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bcd9a161-cc2f-45ab-b591-bf9e0b01e9cc', '5ad507b8-8291-485a-a8ad-ef45a364e213', 'A) Processo Manual com Eletrodo Revestido (SMAW);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58121a0c-78af-48c8-9365-91f01fcf813d', '5ad507b8-8291-485a-a8ad-ef45a364e213', 'B) Processo Oxi-gás (FOW);', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('420ff27e-2c67-48e1-997c-9e6f6408b170', '5ad507b8-8291-485a-a8ad-ef45a364e213', 'C) Processo MIG/MAG (GMAW);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8072af42-d7c7-4d4d-9344-d96a88a82c12', '5ad507b8-8291-485a-a8ad-ef45a364e213', 'D) Processo TIG (GTAW) 93', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63fff1bf-9869-4c0a-9a68-d11d33c60cf3', '5ad507b8-8291-485a-a8ad-ef45a364e213', 'E) Processo com Arame Tubular (FCAW).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('389e025f-bbfd-46d7-9045-82854c338330', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 6', 'Resolva a questão', 43)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '389e025f-bbfd-46d7-9045-82854c338330', 'multiple_choice', 'No que diz respeito ao processo de soldagem manual com eletrodo revestido, quais das alternativas apresentadas, a seguir, não pode ser controlada pelo soldador? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b13274d7-6a6b-45ee-8324-701c1fb5862a', '2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'A) Corrente elétrica;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1a9e7524-690b-4c39-b2ed-2b6e27f1b9c2', '2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'B) Comprimento do arco;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92035dd0-30f0-45a9-9cb1-8fcbbdab0dc9', '2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'C) Ângulos de trabalho e de deslocamento do eletrodo;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('93ee82de-452e-4a9c-880d-308c124b52c9', '2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'D) Velocidade de deslocamento do eletrodo (velocidade de avanço);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('34957499-fd17-4f4e-86e3-c286848c38cb', '2a9fecce-0114-4f3c-ac4c-f3b8ef9bb605', 'E) Impedância', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('700e705b-4de7-4353-9e0e-98dec5a86802', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 7', 'Resolva a questão', 44)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '700e705b-4de7-4353-9e0e-98dec5a86802', 'multiple_choice', 'Sabendo que, na soldagem dos aços carbono, os consumíveis de soldagem “Arame Tubular com Núcleo Metálico” (MCAW, em inglês) e o arame sólido (eletrodo nu), são enquadrados na mesma Especificação AWS A5.18, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f7c924f-be01-47ab-a0cf-fd0f3ea568b7', '9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'A) Para proteger a poça de fusão, ambos os consumíveis necessitam de um gás (ou mistura gasosa) externo;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dbc85140-ba35-4765-88fe-e87b884259b0', '9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'B) Os critérios de classificação dos dois consumíveis relativos à Especificação AWS A5.18 são distintos para cada um: para se determinar a composição química do arame sólido, basta fazer uma análise retirada diretamente do arame sólido, enquanto que para o arame tubular com núcleo metálico faz-se necessário que o derreta sobre uma placa metálica (almofada) e, deste metal depositado é que se retira uma amostra para se determinar a composição química do consumível;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('231a25c4-3ec6-4adf-9de5-f17001e3d6a9', '9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'C) Ambos os consumíveis são empregados utilizando corrente do tipo “contínua”, polaridade inversa.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b408c7df-a591-4b32-8155-caa6614d2aea', '9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'D) Enquanto o arame sólido pode ser utilizado em todas as posições de soldagem, o arame tubular com núcleo metálico é empregado apenas nas posições plana e horizontal;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee43ad1c-daa6-4eda-a9a8-3a40c92a1fcf', '9dbaa791-20a2-4a41-ab1b-a6e758d2cf66', 'E) Os dois consumíveis não produzem escória quando derretidos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('02f4152b-2042-4c5f-9f68-c21454b49558', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 8', 'Resolva a questão', 45)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '02f4152b-2042-4c5f-9f68-c21454b49558', 'multiple_choice', 'No processo de soldagem TIG (GTAW), é sabido que o formato (geometria) da ponta do eletrodo de tungstênio influencia a largura e a penetração do cordão de solda. Na figura a seguir, assinale a combinação correta. \n\n<img src="/images/questions/page94_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('28c1c81d-dd6d-4f79-ab26-0eb63d28a2ab', '7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e5628ce6-bb0f-4b08-8608-2f27f467964f', '7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('98cdd9d9-c74f-475c-a888-e15bba036ee0', '7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46004266-cabc-4d56-91d4-ccd58edf6a37', '7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8f6738a5-756b-4b4a-8eaa-ff696c66fbac', '7c7f4666-9172-4c1e-9bd7-0dfe8b0ef894', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('db550b4d-5904-4ce5-8c34-25d7031b9fee', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 9', 'Resolva a questão', 46)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('72228f9d-9d6f-4b94-badf-862a52f92370', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'db550b4d-5904-4ce5-8c34-25d7031b9fee', 'multiple_choice', 'Qual das alternativas a seguir não é característica do processo a Arco Submerso? \n\n<img src="/images/questions/page94_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('445cadd5-4e8b-4962-bf63-9628c90261a5', '72228f9d-9d6f-4b94-badf-862a52f92370', 'A) Alta velocidade de soldagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12c874da-3133-480d-b1df-3e388932c9de', '72228f9d-9d6f-4b94-badf-862a52f92370', 'B) Dificuldade da soldagem fora da posição plana;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c71ed419-c3a0-4df8-b8e1-f8a9c828f49f', '72228f9d-9d6f-4b94-badf-862a52f92370', 'C) Baixa penetração dos cordões de solda;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83c82698-e21e-4dac-99c0-01e5c0b77c34', '72228f9d-9d6f-4b94-badf-862a52f92370', 'D) Grande tamanho da Zona Termicamente Afetada (ZTA);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('71b8f7fc-4e9c-4541-87e0-19c9ac6b491a', '72228f9d-9d6f-4b94-badf-862a52f92370', 'E) Possibilidade de soldar uma grande faixa de espessura.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4b5fc1a4-5689-486b-879d-3cf38b4ba0c2', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 10', 'Resolva a questão', 47)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ab32127e-86c5-4a86-991a-680094f62d88', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '4b5fc1a4-5689-486b-879d-3cf38b4ba0c2', 'multiple_choice', 'Qual das alternativas a seguir não é função do gás de proteção utilizado nos processos MIG/MAG (GMAW)? \n\n<img src="/images/questions/page94_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('78274c2a-f2a4-4c92-8817-f994d070f5e9', 'ab32127e-86c5-4a86-991a-680094f62d88', 'A) Ionizar o arco;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f1247987-b5e3-4a69-b168-b6692ccb5efc', 'ab32127e-86c5-4a86-991a-680094f62d88', 'B) Proteger a poça de fusão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d8a334d-48c9-4e2c-87ae-5f691f6e2049', 'ab32127e-86c5-4a86-991a-680094f62d88', 'C) Adicionar elementos de liga no metal de solda;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24f6581d-b5c0-4456-bc39-9954cc6679a4', 'ab32127e-86c5-4a86-991a-680094f62d88', 'D) Promover a operacionalidade do processo; 95', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('291d5401-56d3-48ce-bcef-ffe5f94c531c', 'ab32127e-86c5-4a86-991a-680094f62d88', 'E) Influenciar o tipo de transferência metálica do consumível para à peça.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('92326e3b-729e-463f-babd-58546e1e6019', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 11', 'Resolva a questão', 48)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('80baf073-89be-4bb3-9bdc-009ca8f9c173', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '92326e3b-729e-463f-babd-58546e1e6019', 'multiple_choice', 'Qual variável de soldagem, de modo mais efetivo, a penetração dos cordões de solda no processos a arco elétrico? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('86980889-b6e2-4773-bc38-9a9d46ab5994', '80baf073-89be-4bb3-9bdc-009ca8f9c173', 'A) Corrente elétrica;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c39c6ea-f1e6-4622-948c-e05c601318f9', '80baf073-89be-4bb3-9bdc-009ca8f9c173', 'B) Tensão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('59724875-d615-4598-8e2c-a94238452f38', '80baf073-89be-4bb3-9bdc-009ca8f9c173', 'C) Pré-aquecimento;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9bd30dd8-2a13-47a4-9495-f1bd8dd14d03', '80baf073-89be-4bb3-9bdc-009ca8f9c173', 'D) Impedância;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0306955-eeb9-4b33-b00c-92699df3047f', '80baf073-89be-4bb3-9bdc-009ca8f9c173', 'E) Associação entre valores de tensão e grandes temperaturas de pré- aquecimento', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('53216593-dfa8-4fa5-9382-aaf96d52c09a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 12', 'Resolva a questão', 49)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4229f629-c08c-45f4-926e-06a9871b291e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '53216593-dfa8-4fa5-9382-aaf96d52c09a', 'multiple_choice', 'Qual das alternativas abaixo mostra a função principal da adição de uma pequeno teor de Tório no eletrodo de tungstênio empregado no processo TIG (GTAW). ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dae3ddc2-c924-4225-aec0-5db7db27fea2', '4229f629-c08c-45f4-926e-06a9871b291e', 'A) Elimina a possibilidade de produzir descontinuidade do tipo “falta de fusão” entre os cordões;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7a0b1fe6-faa5-4ddf-bca9-7e35f3128834', '4229f629-c08c-45f4-926e-06a9871b291e', 'B) Dispensa o uso de uma fonte de alta freqüência, empregada para permitir a abertura do arco elétrico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45088125-54e6-4f86-9a76-c78c681c9f8d', '4229f629-c08c-45f4-926e-06a9871b291e', 'C) Aumenta a emissividade eletrônica do eletrodo, garantindo maior estabilidade do arco elétrico e durabilidade do eletrodo;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5d7e6636-ab88-48af-801d-74c2d33b78af', '4229f629-c08c-45f4-926e-06a9871b291e', 'D) Foi desenvolvido especificamente para permitir a soldagem de juntas dissimilares, como por exemplo: alumínio com cobre;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3c585c4-3d3c-4f39-b0eb-e573d2f53a95', '4229f629-c08c-45f4-926e-06a9871b291e', 'E) Aumenta em 50% a taxa de deposição do processo TIG (GTAW).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('05af2be2-914e-42c5-b316-ed13ea7a8db7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 13', 'Resolva a questão', 50)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '05af2be2-914e-42c5-b316-ed13ea7a8db7', 'multiple_choice', 'Qual das descontinuidades apresentadas a seguir não é produzida pelos processos MIG/MAG, arco submerso, arame tubular e manual com eletrodo revestido? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2a3ab3b4-9160-4ef5-80a1-5dc8eca5e3cc', 'f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'A) Inclusão de escória;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3991b56b-bd8a-4393-92c2-45b7d96298eb', 'f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'B) Falta de fusão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bb7141d3-269c-484c-aebd-987d6277b8bf', 'f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'C) Inclusão metálica;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9ba5ef7d-4643-4c96-91e3-b91b43d10c5f', 'f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'D) Porosidade;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('446ffe0a-fcdb-4cd7-9018-d61a5dacd0ec', 'f5c32372-cbb2-4d61-b182-1d1ad3a4a0b3', 'E) Trinca sob cordão.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2041a337-ddca-4ddb-b63d-c0ca26158cf7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 14', 'Resolva a questão', 51)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '2041a337-ddca-4ddb-b63d-c0ca26158cf7', 'multiple_choice', 'Quais dos processos de soldagem listados abaixo permitem a produção de soldas conhecidas como “autógenas”? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a5c9cf8-83c3-426d-9d2a-ba2f9c5e5e3e', 'dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'A) Processos a arco submerso e manual com eletrodo revestido;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae29e42a-81b9-492d-a87f-4c50f5c233eb', 'dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'B) Processos manual com eletrodo revestido e MIG/MAG (GMAW);', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2b42c098-66f5-4840-80d3-70ad534896da', 'dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'C) Processos MIG/MAG (GMAW) e Arame Tubular (FCAW);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('99b40070-6d17-4e89-a49e-94ce7f290e1b', 'dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'D) Processos TIG (GTAW) e a arco submerso;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4eabc9e1-d4bd-428a-8b58-d597bafde95b', 'dabe2a0b-154e-45c9-99ee-70d637f8cc93', 'E) Processos TIG (GTAW) e Oxi-gás (OFW).', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f7ee5bf5-0bac-4ddc-998a-46df2d0aa14a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 15', 'Resolva a questão', 52)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f0511636-6cea-470e-8394-65086e7d3d8c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'f7ee5bf5-0bac-4ddc-998a-46df2d0aa14a', 'multiple_choice', 'Qual das alternativas apresentadas a seguir está incorreta quando se analisa o processo de soldagem com Arame Tubular (FCAW)? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2de770e6-48c2-47cc-a0f5-1813c1c6a42d', 'f0511636-6cea-470e-8394-65086e7d3d8c', 'A) Utiliza dois tipos de consumíveis de soldagem: um tipo que necessita da adição de um gás externo e um outro que dispensa o uso de um gás externo;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('677fe664-4657-49a3-99e6-ab90d1f26e1a', 'f0511636-6cea-470e-8394-65086e7d3d8c', 'B) Por não produzir escória, este processo permite uma excelente visualização da poça de fusão durante a soldagem;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('78856fdb-7b99-4806-ba48-2f4120aedfec', 'f0511636-6cea-470e-8394-65086e7d3d8c', 'C) O processo FCAW foi desenvolvido décadas após do desenvolvimento do processo MIG/MAG (GMAW);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c87ff494-75ce-43fc-bae1-f23279de0b3a', 'f0511636-6cea-470e-8394-65086e7d3d8c', 'D) O consumível Arame Tubular produz uma taxa de deposição maior do que a do Eletrodo Revestido;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0113ea28-25e4-42f6-98c6-a5b4b07c5412', 'f0511636-6cea-470e-8394-65086e7d3d8c', 'E) Os Arames Tubulares de diâmetros inferiores a 1,6 mm normalmente necessitam de uma proteção gasosa externa, enquanto aqueles que têm diâmetros maiores do que 1,6 mm dispensam o uso do gás externo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4fbfa287-24af-4772-8766-18b753ae6df6', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 16', 'Resolva a questão', 53)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('420cd159-fceb-4779-ab9a-dce06d2de36e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '4fbfa287-24af-4772-8766-18b753ae6df6', 'multiple_choice', 'Dos gases e suas combinações empregados no processo com arame tubular (FCAW) na soldagem de aços carbono apresentadas a seguir, indique qual alternativa está incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c8fae833-d7d5-4c3c-b249-c623c29f3a88', '420cd159-fceb-4779-ab9a-dce06d2de36e', 'A) 75% Ar + 25% O2', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48af7a79-afd1-4ea5-9f28-82020205ad58', '420cd159-fceb-4779-ab9a-dce06d2de36e', 'B) 100% CO2', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('49f41b9c-8c99-47f9-9a56-6f78fe0ceda3', '420cd159-fceb-4779-ab9a-dce06d2de36e', 'C) 90% Ar + 10% CO2', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('82011358-5b56-45e8-b1e5-2261126bad22', '420cd159-fceb-4779-ab9a-dce06d2de36e', 'D) 98% Ar + 2% O2', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2025d6f1-8057-4ab6-b130-fb336b1bc2e6', '420cd159-fceb-4779-ab9a-dce06d2de36e', 'E) 82% Ar + 18% CO2', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('89f817b4-5c9e-44f7-8a8b-a11ed2998ea7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 17', 'Resolva a questão', 54)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('111af490-f6c5-48f9-a36e-1e98e110605f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '89f817b4-5c9e-44f7-8a8b-a11ed2998ea7', 'multiple_choice', 'Comparando os dois tipos de arames tubulares (auto-protegido [“self- shielded”, em inglês] e aquele que necessita de uma proteção externa de gás [“gas shielded”, em inglês]), marque a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('15b26a20-2e1b-4185-90da-7bc649e50df4', '111af490-f6c5-48f9-a36e-1e98e110605f', 'A) Ambos os arames tubulares, embora semelhantes, apresentam características distintas; geralmente os Auto-protegidos têm internamente uma configuração metálica de forma complexa, além do fluxo, diferentemente dos arames que necessitam de proteção externa que, internamente, só possuem fluxo.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb9439b3-8780-4264-b88d-4ef7e00023fe', '111af490-f6c5-48f9-a36e-1e98e110605f', 'B) No fluxo, colocado no interior dos arames, são encontradas substâncias que geram gases de proteção;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ab28976-a970-47e7-87e0-5900d846ef42', '111af490-f6c5-48f9-a36e-1e98e110605f', 'C) Na fabricação de arames tubulares de grandes diâmetros, é comum que o fabricante use uma fita metálica com uma largura maior do que aquela necessária para a sua fabricação. O excesso de fita, teoricamente desnecessário, é introduzido no interior do arame, permitindo que, quando da fusão do arame, todo o fluxo existente naquele ponto, receba o calor proveniente do efeito Joule produzido pela passagem da corrente elétrica pela massa metálica do arame;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20f0d973-7d05-449d-9d4c-d94ce62f03c0', '111af490-f6c5-48f9-a36e-1e98e110605f', 'D) O arame tubular foi desenvolvido visando unir as vantagens do processo MIG/MAG (GMAW), nos modos semi-automático ou automático, com as do processo com eletrodo revestido (revestimento fusível formador de gases protetores, escória, elementos de liga, etc.).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f5d28c76-a102-4f73-a094-b109c051d753', '111af490-f6c5-48f9-a36e-1e98e110605f', 'E) Os elementos químicos que vão conferir ao metal de solda ótimas propriedades mecânicas (resistência mecânica, tenacidade, dutilidade, etc.) estão incorporados na fita metálica externa.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1954523e-303c-45fd-890a-c92a0d6bbc8c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 18', 'Resolva a questão', 55)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('163d92bf-e886-4e68-9c25-01425ed4046b', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '1954523e-303c-45fd-890a-c92a0d6bbc8c', 'multiple_choice', 'Sabe-se que os diferentes tipos de Transferências Metálicas produzidas no processo MIG/MAG (GMAW) dependem de alguns fatores. Das alternativas apresentadas a seguir, identifique aquela que não influencia nessas transferências. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('39a37f1e-60ab-4e66-b9db-bd43a30cc940', '163d92bf-e886-4e68-9c25-01425ed4046b', 'A) Tipo do gás de proteção empregado;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('22367d54-e55c-4999-b9ed-c5c0bd52c145', '163d92bf-e886-4e68-9c25-01425ed4046b', 'B) Variações dos valores da velocidade de avanço do consumível;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63bde009-b411-44c4-bc4e-139007cf793b', '163d92bf-e886-4e68-9c25-01425ed4046b', 'C) Variações dos valores de intensidade de corrente elétrica;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8dd90e05-86c2-4db9-9034-f75d0107f008', '163d92bf-e886-4e68-9c25-01425ed4046b', 'D) Natureza do consumível de soldagem;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('857870b7-8191-4cb9-9ace-70af75319eb3', '163d92bf-e886-4e68-9c25-01425ed4046b', 'E) Variações dos valores da tensão do arco elétrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ba2919ff-79ed-467d-9462-bace290ce08a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 19', 'Resolva a questão', 56)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('36500c78-1a47-4159-ae79-af844f694931', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ba2919ff-79ed-467d-9462-bace290ce08a', 'multiple_choice', 'Comparando o processo de soldagem Oxi-gás (OFW) com os processos manual com eletrodo revestido, MIG/MAG (GMAW), TIG (GTAW) e Arco Submerso, assinale a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6660de0e-fdad-46fd-9b4a-6a8221a0737f', '36500c78-1a47-4159-ae79-af844f694931', 'A) A produtividade apresentada pelo processo Oxi-gás é baixa, assemelhando-se apenas com aquela apresentada pelo processo TIG manual;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('318be482-3b4e-4a9c-af43-5ff764124236', '36500c78-1a47-4159-ae79-af844f694931', 'B) O processo Oxi-gás apresenta uma chama como fonte de calor, enquanto os demais processos a fonte de calor provém do arco elétrico;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e0eb03a-9e34-4e8c-9e52-81f60f7185ae', '36500c78-1a47-4159-ae79-af844f694931', 'C) Os volumes dos gases combustível e comburente, na mistura que acontecerá dentro do maçarico, devem ser previamente ajustados pelo soldador, em função do metal de base que será soldado e do tipo de chama que se deseja trabalhar;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be7cf83a-9f85-4743-9f4b-994a28a1296a', '36500c78-1a47-4159-ae79-af844f694931', 'D) Assim como o processo TIG (GTAW) manual, no caso do processo Oxi-gás apenas a mistura formada pelos gases combustível e comburente é capaz de impedir a entrada dos gases do ar atmosférico na poça de fusão; nenhum outro consumível de soldagem se faz necessário para remover impurezas encontradas na poça de fusão;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('045b2166-0213-442a-be84-dc6c435df9c4', '36500c78-1a47-4159-ae79-af844f694931', 'E) Assim como no processo TIG (GTAW), tanto manual quanto mecanizado, a formação das gotas (na fusão do metal de adição) não acontece na origem da fonte de calor.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('344a4437-3135-4cb3-80bd-065ae1474603', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 21', 'Resolva a questão', 57)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('67c767df-a410-472b-b7a7-b7cb0984c156', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '344a4437-3135-4cb3-80bd-065ae1474603', 'multiple_choice', 'Em relação ao processo a arco submerso (SAW), assinale a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('89618ead-4fe8-4582-b066-c17f4819f07b', '67c767df-a410-472b-b7a7-b7cb0984c156', 'A) Caso seja necessário empregar intensidades de correntes elétricas superiores àquelas que a fonte de energia pode suportar, é possível obter altas correntes ligando duas fontes em série;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a5a2cbc9-b02b-484e-8ab0-baf78b5b19b6', '67c767df-a410-472b-b7a7-b7cb0984c156', 'B) Uma das grandes desvantagens deste processo é sua limitação à posição plana;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c4e6a8f-f017-4105-81f3-bf63cd605495', '67c767df-a410-472b-b7a7-b7cb0984c156', 'C) O transformador é o único tipo de fonte de energia que pode ser utilizada neste processo. Soldagem feita com corrente contínua introduz grandes quantidades de descontinuidades na junta soldada;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c7a0e7d8-fc61-456b-837c-4124262e430a', '67c767df-a410-472b-b7a7-b7cb0984c156', 'D) Este processo é indicado para ser empregado apenas em juntas de topo, preferencialmente para espessuras menores do que 10 mm;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dff7c87f-6fff-4bf6-90e9-e90baf314a6f', '67c767df-a410-472b-b7a7-b7cb0984c156', 'E) Cuidados devem ser tomados quanto à regulagem da tensão do arco, pois altas tensões aumentam o consumo do fluxo empregado, produzindo uma alteração na composição química do metal de solda;', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('df175306-3b52-4066-8ba2-7fc7cdc9408a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 22', 'Resolva a questão', 58)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'df175306-3b52-4066-8ba2-7fc7cdc9408a', 'multiple_choice', 'Analisando especificamente o processo a arco submerso (SAW), marque a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4eb607dd-5552-4a76-9068-b310d159ba09', '7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'A) Quanto maior o stickout (comprimento do arame que sai do bico de contato e vai até à sua extremidade), maior é a taxa de deposição;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3768249-bd55-4539-8a06-e43230afb092', '7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'B) Se uma mesma intensidade de corrente elétrica percorre ao longo de dois arames com diâmetros diferentes, pode-se afirmar que o arame de menor diâmetro produzirá cordões de solda com uma penetração menor.;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('145d34ae-b35c-44d8-96a9-82a0e9081fdf', '7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'C) Quanto maior o valor da tensão, maior será o comprimento do arco elétrico;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('60f90ed3-92fa-4bd0-93bb-b3adc9f91bd1', '7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'D) Quanto maior a intensidade de corrente elétrica, maior será a penetração dos cordões de solda;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0914e998-efd6-4a1b-90d6-04bf716f2ee9', '7a7f734b-a4f0-4ba2-824b-3fbdbf5f2abd', 'E) Quanto menor a velocidade de soldagem, maior será a penetração dos cordões de solda.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('57365c42-b12d-48c6-a84a-20e7b50b26f3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 23', 'Resolva a questão', 59)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '57365c42-b12d-48c6-a84a-20e7b50b26f3', 'multiple_choice', 'Todas as descontinuidades apresentadas abaixo são possíveis de serem produzidas pelo processo a arco submerso (SAW), porém uma delas tem a maior chance de ser produzida. Marque esta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ac960715-b02e-4fe2-b39f-8786355b614f', 'b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'A) Falta de penetração;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24db9d67-f886-4fca-b5bf-7bccc897579f', 'b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'B) Trinca em estrela;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b85bffb3-51c1-401c-a231-aae8904a24d6', 'b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'C) Trinca na margem;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e34ccd72-5e57-4094-91b6-904d01a51e22', 'b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'D) Perfuração;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06511b0c-bc50-4d4c-9db5-18c29524b061', 'b731cea0-208f-4a6e-b1a7-d591c1bcd6bd', 'E) Falta de fusão.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('18836cec-a1eb-4c7b-be1e-8f5781800b5f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 24', 'Resolva a questão', 60)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '18836cec-a1eb-4c7b-be1e-8f5781800b5f', 'multiple_choice', 'Na soldagem do Alumínio e suas ligas, utilizando o processo TIG (GTAW), identifique a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45e06d01-6831-4709-b4e4-13222a167c28', 'a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'A) Tipo de corrente ideal: Corrente Alternada;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2825bbce-96b5-45bc-901f-e51410d2c08e', 'a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'B) Tipo de eletrodo de tungstênio: acrescido de 2,0% de Óxido de Tório (ThO2), classificação AWS EWTh-2;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0fd1977-0d9d-490b-86dc-92ddfafb7615', 'a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'C) Tipos de corrente e polaridade ideais, respectivamente: Corrente Contínua e Polaridade ideal: Direta (eletrodo ligado ao pólo negativo);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('432c0456-8f9c-493c-9437-1eff477fe1e4', 'a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'D) Para obter um arco elétrico de grande estabilidade, a ponta do eletrodo de tungstênio deve ter um ângulo de 15ºC, se parecendo com a ponta de um lápis apontado;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2f62c92-b8eb-4758-bf15-9e3ddde8e325', 'a707715d-8b18-4436-b0c3-cd7e02d8d0d8', 'E) O gás ideal para soldar chapas de alumínio, com espessuras em torno de 50 mm, é o Argônio (gás inerte).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b4f1e25f-b39c-4da5-acc2-ea9a46d0f881', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 26', 'Resolva a questão', 61)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b4f1e25f-b39c-4da5-acc2-ea9a46d0f881', 'multiple_choice', 'No que diz respeito às vantagens do processo de soldagem oxi-gás, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4f5f28a-415b-449f-ac33-f01e7de45c9b', 'a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'A) Umas das maiores vantagens do uso deste processo é o grau relativamente baixo da habilidade requerida do soldador.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('17a66433-5b12-44ee-ac65-15a135a19f25', 'a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'B) É um processo relativamente barato e é altamente portátil;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f6bca2fa-a309-413b-8e0a-92afb8955d90', 'a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'C) Assim como o processo manual com eletrodo revestido, o processo oxi-gás pode ser usado em todas as posições de soldagem;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('645c0959-d2bb-4278-b2a1-6eaf55b1ef6f', 'a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'D) Os equipamentos de soldagem usados neste processo podem ser usados em outras operações, como por exemplo: brasagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee89b993-7441-485c-b96d-3ddfe0a6d63e', 'a06d73ed-a1b3-4781-bbc2-fe9291d0f70e', 'E) Este processo pode ser usado para soldar chapas e tubos com espessuras finas e médias.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('769ee304-bfd1-4644-84ba-c032bd287053', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 28', 'Resolva a questão', 62)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '769ee304-bfd1-4644-84ba-c032bd287053', 'multiple_choice', 'Das descontinuidades possíveis de serem produzidas na soldagem do aço carbono, quando empregado o processo de soldagem oxi-gás, assinale a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69aa26c5-1a35-4287-90da-3d77cafe6695', '8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'A) Quando a chama é do tipo Oxidante, frequentemente são encontradas descontinuidades do tipo Falta de Fusão;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('34e53fe9-19eb-486d-97bd-ddb77d78ff51', '8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'B) A Falta de Fusão pode ser produzida quando o soldador utiliza a chama normal, porém, manipulando-a incorretamente;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a393eeb-e33a-41fc-92ea-e9abd50aeb3e', '8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'C) Devido à rápida velocidade de resfriamento da junta soldada por este processo, a trinca a frio é uma das descontinuidades mais produzidas;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('09f0cf07-29d7-4f6e-9b58-c5b2d26e82db', '8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'D) Descontinuidades do tipo Inclusão de Escória pode ser produzida quando se utiliza chama do tipo Oxidante;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f02562be-f42a-4c7c-9d32-a51554f1692c', '8c40c2e0-e5c6-4b16-87a5-2e231d18e1ce', 'E) Porosidade, Mordedura e Sobreposição são descontinuidades muito comuns neste tipo de processo. São falhas atribuídas diretamente ao soldador.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c96927d6-fb9c-4865-862d-fb905a392a08', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 29', 'Resolva a questão', 63)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3df6121c-f6fe-45c0-be77-d47307a3fec8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'c96927d6-fb9c-4865-862d-fb905a392a08', 'multiple_choice', 'Em relação às técnicas conhecidas como “Soldagem à Direita” e “Soldagem à Esquerda” empregadas no processo de soldagem oxi-gás, identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('debe88e7-eb0b-4a5d-b194-7574c31d953d', '3df6121c-f6fe-45c0-be77-d47307a3fec8', 'A) Utilizando a técnica “Soldagem à Direita”, a vareta desloca-se atrás da chama, no sentido da soldagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6106c9c2-1e7f-46c6-a3b7-36a5c355169e', '3df6121c-f6fe-45c0-be77-d47307a3fec8', 'B) Utilizando a técnica “Soldagem à Esquerda”, a vareta desloca-se à frente da chama, no sentido da soldagem', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('03e4e86a-b3d6-451f-ab16-7dfe702cc70a', '3df6121c-f6fe-45c0-be77-d47307a3fec8', 'C) A técnica “Soldagem à Direita” é mais rápida e econômica do que a técnica “Soldagem à Esquerda”;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b1491ae3-6594-4172-bcc6-b3d9b2314ce9', '3df6121c-f6fe-45c0-be77-d47307a3fec8', 'D) A técnica “Soldagem à Esquerda” é mais lenta, consome mais gás, produz soldas com melhor acabamento se comparada à técnica “Soldagem à Esquerda”;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d89ad698-7d5d-4942-b0df-0ac58025666d', '3df6121c-f6fe-45c0-be77-d47307a3fec8', 'E) Esta convenção de técnicas de ”Soldagem à Direita” e “Soldagem à Esquerda” foi estabelecida apenas para os soldadores destros, ou seja, que usam a mão direita para escrever um texto. Para os soldadores canhotos, ou seja, usam a mão esquerda para escrever, o nome das técnicas tem que ser invertido.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b517d936-6eeb-44d2-961e-3a5ea24b0aa2', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 64)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ece9e1d3-b4b1-4435-9097-68723b81ab92', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b517d936-6eeb-44d2-961e-3a5ea24b0aa2', 'multiple_choice', '4 Dependendo do volume de cada gás em uma determinada mistura, são obtidos três tipos de chama distintos: Normal, Oxidante e Redutora. Em relação a estas diferentes chamas, marque a alternativa incorreta: ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9cfb4c69-c1e7-4224-b2d5-375ed614bd5c', 'ece9e1d3-b4b1-4435-9097-68723b81ab92', 'A) Uma chama produzida por uma mistura gasosa, contendo um volume de Acetileno maior do que o do Oxigênio, esta é conhecida como “Chama Oxidante”. Uma das características deste tipo de chama é criar uma junta soldada bastante oxidada, com baixa resistência mecânica e baixa tenacidade;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24a1149d-826c-40a2-9b83-915b37238f46', 'ece9e1d3-b4b1-4435-9097-68723b81ab92', 'B) Uma chama, produzida por uma mistura gasosa contendo um volume de Oxigênio maior do que o do Acetileno, esta é conhecida como “Chama Redutora”; este tipo de chama é próprio para soldar latão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fd5f04f4-e506-4b80-ba2c-fa87da27cc6d', 'ece9e1d3-b4b1-4435-9097-68723b81ab92', 'C) A chama do tipo “Oxidante” caracteriza-se em introduzir uma certa quantidade de carbono (proveniente da queima do Acetileno) no metal de solda, tornando-o poroso e quebradiço;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a55f9602-d1da-4916-87c1-b661debe8d25', 'ece9e1d3-b4b1-4435-9097-68723b81ab92', 'D) Enquanto a “Chama Oxidante”, por ser mais turbulenta, apresenta um ruído característico, a “Chama Redutora” produz uma terceira região (além do cone e de um Penacho de cor esverdeada), apresentando uma luminosidade característica e intensa;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3b768ec8-7299-49be-b0d2-35441ae71509', 'ece9e1d3-b4b1-4435-9097-68723b81ab92', 'E) Uma chama produzida por uma mistura gasosa, contendo volumes iguais de Oxigênio e Acetileno, esta é conhecida teoricamente como “Chama Normal”. Na prática, isto é impossível de se obter. As chamas produzidas neste processo são geralmente do tipo “Redutoras” ou “Oxidantes”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('16366751-950d-49cb-bb50-b7202576ba79', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 31', 'Resolva a questão', 65)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '16366751-950d-49cb-bb50-b7202576ba79', 'multiple_choice', 'Das descontinuidades possíveis de serem produzidas na soldagem do aço carbono empregando o processo de soldagem MIG/MAG (GMAW), assinale aquela que é característica deste processo. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('76504067-578e-46be-a232-4d7356358c03', '48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'A) Trinca interlamelar;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a9fb0fec-7a5f-450a-a15c-95149b582af1', '48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'B) Inclusão de escória;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18904c0a-0d52-41d6-a5d0-4e6166cb1522', '48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'C) Mordedura na raiz;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c10aef64-43d5-4bc9-805b-f58dd7c34143', '48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'D) Sobreposição;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b16482a-e5b8-413f-b6b9-ea9690e6cb9e', '48c62123-85dc-40b6-a674-2f7f3b6d7b5c', 'E) Falta de fusão.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('be7f6258-d111-4f41-835a-0fe64b77bb63', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 66)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'be7f6258-d111-4f41-835a-0fe64b77bb63', 'multiple_choice', '5 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e6db283-8949-4e17-b1b1-ace919a08785', 'c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'A) Para que o arco elétrico seja aberto instantaneamente neste processo é imprescindível que o soldador toque o metal de base com a ponta do eletrodo de tungstênio;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f03dfdbf-1cd6-4c05-91b3-509253044c3a', 'c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'B) Pelo fato da vareta empregada no processo TIG manual ser isenta de revestimentos e fluxos que tenham substâncias que purifiquem a poça de fusão durante a soldagem, isto torna de grande importância a necessidade de realizar uma excelente limpeza no interior da junta que será soldada e adjacências;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e348d0c8-948f-4ee3-aab5-d538b4a56d35', 'c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'C) Objetivando evitar um grande desgaste da ponta do eletrodo de tungstênio pelo bombardeamento de elétrons durante a soldagem de aço carbono, é recomendável o emprego da corrente do tipo “contínua”, polaridade invertida;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ce461999-3567-4b15-a7fb-1ce264062820', 'c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'D) Na soldagem de metais que, quando oxidados durante a soldagem, geram óxidos do tipo “refratários” (como por exemplo: Magnésio e Alumínio), é fundamental o uso de um transformador, que seja capaz de gerar uma corrente do tipo “contínua”, polaridade direta;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c86a9a64-d4c5-40fc-ad3f-571004672206', 'c1085e66-8e78-47ce-9d31-9e80ba9d001d', 'E) O eletrodo de tungstênio puro passou a não ser mais utilizado no processo TIG após a chegada, no mercado, dos eletrodos que possuem em suas superfícies óxidos de Tório, óxidos de Lantano, entre outros.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('609d74f5-d55a-42e2-8053-64f455a73641', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 5', 'Resolva a questão', 67)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('61544d60-80ac-4925-ba57-4c4da88b3c34', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '609d74f5-d55a-42e2-8053-64f455a73641', 'multiple_choice', 'rames ao mesmo tempo; ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5fb4ef86-7986-4afd-af50-1d5769e399f5', '61544d60-80ac-4925-ba57-4c4da88b3c34', 'B) Devido ao uso de fluxos, as soldas produzidas por este processo possuem uma alta qualidade;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa2406e2-a522-4c3a-abfe-429831ace4ea', '61544d60-80ac-4925-ba57-4c4da88b3c34', 'C) Tendo em vista que o arco elétrico encontra-se submerso ao fluxo, isto torna desnecessário que o soldador se preocupe quanto ao volume de fluxo depositado sobre o arco;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1fc210fa-c4b1-4f97-ad2c-b85a91effcef', '61544d60-80ac-4925-ba57-4c4da88b3c34', 'D) Analisando as vantagens sobre o ângulo da proteção da soldagem, este processo gera um baixo volume de fumaça;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b335dcc4-b742-464f-b265-dcef20827480', '61544d60-80ac-4925-ba57-4c4da88b3c34', 'E) Minimizando os requisitos de proteção, nenhum arco elétrico fica visível durante a soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b8478921-2692-4073-8f01-87bb5162d6d8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 35', 'Resolva a questão', 68)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a24f09ca-9399-4d98-b961-3e6181fc7377', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b8478921-2692-4073-8f01-87bb5162d6d8', 'multiple_choice', 'Quanto aos tipos de correntes, polaridades e outros temas relevantes ligados ao processo a arco submerso (SAW), identifique a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7d5b63e1-92e4-4272-af11-9ba54efd52d7', 'a24f09ca-9399-4d98-b961-3e6181fc7377', 'A) Para evitar o fenômeno conhecido com “sopro magnético” durante a soldagem, é recomendável o uso de fontes de energia que gerem corrente alternada;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('682fcd3f-1fab-4b4c-9fcf-e7ced7ca6d76', 'a24f09ca-9399-4d98-b961-3e6181fc7377', 'B) A característica estática típica dos retificadores próprios para este processo é conhecida como característica “tombante” ou “corrente constante”;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('426483c9-9e62-49b9-835b-5672ce58fb70', 'a24f09ca-9399-4d98-b961-3e6181fc7377', 'C) O uso da corrente alterna permite melhor controle do formato do cordão de solda, assim como a profundidade de penetração;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('22e1ce5e-29b2-45f1-bb45-b2ffeee964f6', 'a24f09ca-9399-4d98-b961-3e6181fc7377', 'D) Umas das desvantagens deste processo é a limitação das fontes de energia no que se refere à faixa de corrente. Normalmente, essas fontes geram corrente elétrica, máxima, de 500A;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('72c19773-e1d4-4b60-8731-24339b4b956e', 'a24f09ca-9399-4d98-b961-3e6181fc7377', 'E) Apesar de pouco utilizada, a corrente do tipo “contínua”, polaridade inversa, produz as maiores taxas de deposição, se comparadas com a polaridade direta.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4610d30e-c2dd-4602-8dea-68b724b7b43c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 69)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '4610d30e-c2dd-4602-8dea-68b724b7b43c', 'multiple_choice', '7 ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c5e7d2b4-c6b7-4156-8911-907cfc33faeb', '9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'A) Sistema de controle;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5918a413-1846-4986-a265-b63dec9c00d5', '9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'B) Dispositivo de alimentação de fluxo;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9df1e138-761b-4496-b875-96c9145b6822', '9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'C) Sistema de movimentação;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('71509341-4747-4abc-8d0f-d2ad926ee59f', '9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'D) Alimentador de arame;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aa974110-4df4-4f46-8863-ef8211ad2179', '9ee077d1-f4aa-4c3d-877b-8b7ecd51d020', 'E) Fonte de alta frequência.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('24718dd7-6686-464c-834d-05ce9e457a52', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 39', 'Resolva a questão', 70)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '24718dd7-6686-464c-834d-05ce9e457a52', 'multiple_choice', 'Quanto às características relativas ao processo de soldagem Arame Tubular (FCAW), identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('54875157-1adc-42d7-8c88-931ce92e3cfe', '0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'A) Os modos de transferência metálica (curto-circuito, globular, spray) utilizados neste processo podem ser os mesmos que existem no processo GMAW convencional;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fdce70cd-12e4-43f6-9231-deb3dcbd2d69', '0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'B) As soldagens executadas com este tipo de arame apresentam sempre uma camada de escória que cobre total ou parcialmente o cordão de solda; esta escória deve ser removida antes da deposição de um novo cordão, tal qual no caso da soldagem com eletrodos revestidos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8bd285a6-f492-48c2-8f7a-5ef02a868a4f', '0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'C) Além da proteção, os fluxos podem desempenhar outras funções, semelhantes às dos revestimentos dos eletrodos, como por exemplo: desoxidar e refinar o metal de solda e fornecer elementos que promovam a estabilização do arco elétrico, entre outras;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b1e39d88-b177-46d0-a5ad-4615713b6289', '0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'D) O arame tubular do tipo “auto-protegido”, pelo fato do fluxo interno ser capaz de gerar sua própria proteção gasosa, ele é altamente indicado para ser empregado em áreas abertas (externas às oficinas);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4ceb1d5b-2e1f-42ed-8da5-30726fecb9b3', '0cf5ab32-e572-49ef-8b7e-81b89d3a83e8', 'E) É muito comum neste processo usar dos benefícios fornecidos pela variação do stickout (extensão livre do eletrodo); objetivando obter maiores taxas de deposição, usando o arame tubular, aconselha-se o uso de pequenos stickouts.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9839c822-df95-4aef-9d18-23926b02bf27', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 40', 'Resolva a questão', 71)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c2090231-7e49-400b-b39e-dce88ecc69d9', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '9839c822-df95-4aef-9d18-23926b02bf27', 'multiple_choice', 'Como qualquer outro processo de soldagem, o processo com arame tubular também produz descontinuidades na região da junta soldada.  Das descontinuidades apresentadas a seguir, identifique aquelas que são produzidas especificamente pelo processo em questão. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a47896fc-9b44-4d07-910b-01180dc52aa1', 'c2090231-7e49-400b-b39e-dce88ecc69d9', 'A) Embicamento e Deformação angular;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fced3fe8-7388-4954-ad0d-487b06626c91', 'c2090231-7e49-400b-b39e-dce88ecc69d9', 'B) Desalinhamento e Penetração excessiva;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('86ccf19e-8ce5-4474-ba34-5268268242dd', 'c2090231-7e49-400b-b39e-dce88ecc69d9', 'C) Rechupe de cratera e Reforço excessivo;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4adf0f2a-d8ff-46d6-a847-98a6307f21df', 'c2090231-7e49-400b-b39e-dce88ecc69d9', 'D) Falta de fusão e inclusão de escória;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8db50779-b9e0-4d87-b624-b5a95fd75977', 'c2090231-7e49-400b-b39e-dce88ecc69d9', 'E) Sobreposição e respingos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b06cacb9-0380-4dc1-9089-0ec32952b5e7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 20', 'Resolva a questão', 72)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a447fcca-079d-446b-9f36-d336e9d08ef7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b06cacb9-0380-4dc1-9089-0ec32952b5e7', 'multiple_choice', '; ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('17f48ee6-54b3-4896-aa25-53ee01da732e', 'a447fcca-079d-446b-9f36-d336e9d08ef7', 'C) O uso da transferência metálica do tipo “spray” (ou “névoa”) é uma das maneiras adotadas para aumentar a produtividade da construção da obra, porém, este tipo de transferência só poderá ser obtida a possibilidade irá depender do tipo de gás (ou mistura gasosa) utilizada;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12430ad5-3425-45a7-9618-2bd9dbc73c6d', 'a447fcca-079d-446b-9f36-d336e9d08ef7', 'D) Para permitir a transferência do tipo “pulsada”, basta que se acople uma fonte de alta freqüência junto ao cabeçote do retificador;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6d602bbf-f70c-4790-95d8-c74516dad189', 'a447fcca-079d-446b-9f36-d336e9d08ef7', 'E) O aumento da produtividade conferido pelo uso da transferência metálica do tipo “spray” pois possibilita a soldagem das juntas de ângulo na posição vertical, progressão descendente.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('816fa4d6-3e5e-4d5e-be7f-bc3d04be4147', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 42', 'Resolva a questão', 73)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5a304145-29a3-40d3-b98b-71e0bb1df863', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '816fa4d6-3e5e-4d5e-be7f-bc3d04be4147', 'multiple_choice', 'Sabendo-se que as transferências metálicas que ocorrem nos processos MIG/MAG (GMAW) e FCAW podem ser do tipo “spray” (ou “névoa” ou “pulverização axial”), “curto-circuito”, “globular” e “pulsada” (ou “arco pulsante”), marque a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8455c74c-bb16-49f0-8ed3-e06d54c803a5', '5a304145-29a3-40d3-b98b-71e0bb1df863', 'A) Tendo em vista que a transferência por “curto-circuito” caracteriza-se no fato do arco elétrico se abrir e fechar 120 vezes por minuto, isto dificulta bastante o uso deste tipo de transferência nas posições vertical e sobre-cabeça;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0f6f1550-d39d-430f-a468-40e075b5adfe', '5a304145-29a3-40d3-b98b-71e0bb1df863', 'B) Misturas ricas em Argônio, associadas a altos valores de corrente elétrica e tensão, permitem que seja obtida a transferência metálica do tipo “spray”;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f8965d76-1d5c-45bc-8d0e-18eec67d57c7', '5a304145-29a3-40d3-b98b-71e0bb1df863', 'C) As transferências metálicas apresentadas no enunciado da questão podem ser obtidas variando apenas as intensidades de corrente elétrica (A) e os valores de tensão (V). Em uma ordem crescente dessas variáveis (I e V) podem-se obter os modos  “globular”, “spray” (ou “névoa” ou “pulverização axial” e “curto-circuito” (nesta sequência);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b21aa3c-c659-44db-9c9a-fa8e266d52d3', '5a304145-29a3-40d3-b98b-71e0bb1df863', 'D) Na transferência metálica do tipo “globular”, a fusão inicia-se globularmente e a gota vai aumentando de tamanho até tocar a poça de fusão, produzindo um grande clarão, extinguindo o arco logo em seguida;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2726be2f-a172-4d11-9d04-151e1ac0b405', '5a304145-29a3-40d3-b98b-71e0bb1df863', 'E) As soldagens realizadas com transferências metálicas por “arco pulsante” e por “curto circuito” são adequadas para soldagem na posição plana.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5f8f2366-e939-4266-a26c-d9b66f1f023b', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 43', 'Resolva a questão', 74)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a060af84-0f65-4ceb-b69f-2f8a553999d4', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '5f8f2366-e939-4266-a26c-d9b66f1f023b', 'multiple_choice', 'O processo de soldagem manual com eletrodo revestido é conhecido como aquele que apresenta a maior flexibilidade entre aqueles usados na indústria. Analisando as afirmativas a seguir, indique aquela que não cabe no contexto da questão. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8932188c-9d8e-4b9d-ae1f-ae7354f768b9', 'a060af84-0f65-4ceb-b69f-2f8a553999d4', 'A) Os cabos referentes a este processo são tão flexíveis, que 10 metros de cabo são capazes de ocupar um mínimo espaço no almoxarifado;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('66b846cf-0b56-41f1-941e-a93dab27e314', 'a060af84-0f65-4ceb-b69f-2f8a553999d4', 'B) Processo usado na soldagem da maioria dos metais encontrados na indústria;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3edace25-d2d6-4a58-babc-17660a8e29e6', 'a060af84-0f65-4ceb-b69f-2f8a553999d4', 'C) Existem eletrodos revestidos que podem ser usados em todas as posições de soldagem;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee9f0705-f21f-473e-b417-e7000afb3968', 'a060af84-0f65-4ceb-b69f-2f8a553999d4', 'D) Permite ser utilizado numa ampla faixa de espessura, assim como em todos os tipos de juntas;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9973ee08-2fdc-4741-b66d-f10e6aacbc47', 'a060af84-0f65-4ceb-b69f-2f8a553999d4', 'E) Permite ser usado em espaços confinados e seus consumíveis de soldagem são facilmente encontrados no mercado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ba3514eb-78c7-44c5-9f52-acc53528a163', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 44', 'Resolva a questão', 75)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('629ad7be-006c-4a39-8f31-8ea203c2a4db', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ba3514eb-78c7-44c5-9f52-acc53528a163', 'multiple_choice', 'Comparando o processo de soldagem manual com eletrodo revestido (SMAW) com outros processos de soldagem empregados usualmente na indústria, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('045cdaff-70d1-495d-8bec-1778d9ca7ebb', '629ad7be-006c-4a39-8f31-8ea203c2a4db', 'A) O processo com eletrodo revestido (SMAW) apresenta uma taxa de deposição inferior aos processos como MIG/MAG (GMAW), arame tubular (FCAW) e Arco submerso (SAW);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('de17c993-e1bf-4e7c-994c-96516e186f1e', '629ad7be-006c-4a39-8f31-8ea203c2a4db', 'B) O processo com eletrodo revestido (SMAW) apresenta um baixo Fator de Ocupação ou Fator de Trabalho (Relação entre o tempo que o soldador permanece com o arco elétrico aberto e o tempo total de trabalho) em relação aos processos semi-automáticos e automáticos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7ef50f9b-518d-49f1-989c-d6636793394e', '629ad7be-006c-4a39-8f31-8ea203c2a4db', 'C) O processo com eletrodo revestido (SMAW) exige um período de treinamento para o soldador maior do que para os processos de soldagem semi-automáticos e automáticos;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('352460c2-d21a-4748-b31e-5f6fa6213400', '629ad7be-006c-4a39-8f31-8ea203c2a4db', 'D) Apesar de ser um processo manual, o processo SMAW é o mais utilizado tanto na indústria brasileira, como nos países mais desenvolvidos;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d7bb786c-3bd6-4eee-bc2a-5cae54a7d377', '629ad7be-006c-4a39-8f31-8ea203c2a4db', 'E) Como o processo com eletrodo revestido é considerado de baixa produtividade, isto faz com o mesmo não seja indicado para soldar espessuras superiores a 40 mm.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ca21cac8-a777-4ee7-87d4-27f5913bb29d', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 45', 'Resolva a questão', 76)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ca21cac8-a777-4ee7-87d4-27f5913bb29d', 'multiple_choice', 'Das descontinuidades possíveis de serem produzidas pelo processo de soldagem manual com eletrodo revestido (SMAW), marque a alternativa a seguir que menos chance tem de ser produzida por este processo. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48744d3e-7051-439b-914f-387f30bca13c', '66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'A) Inclusão de escória;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c50d054f-1ff2-4ee9-9c22-e6a4d5437c23', '66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'B) Falta de fusão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a6f62e0-44e4-4fec-a26c-437969c1ea2e', '66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'C) Trinca de cratera;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e82c2110-2494-4ada-80af-94881e3256af', '66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'D) Porosidade;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('038182b3-a4d8-42fd-a666-3cbfa4f5912a', '66a08e3b-78e3-4501-9a9c-c73d7c9e4ef5', 'E) Desalinhamento.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c4ebe19a-4e40-4993-ade3-98c05a544b30', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 46', 'Resolva a questão', 77)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('74da6fc3-9626-4fac-8439-8602e02986bf', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'c4ebe19a-4e40-4993-ade3-98c05a544b30', 'multiple_choice', 'Quais são os consumíveis de soldagem específicos para o processo de soldagem Eletroescória (ESW)? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ef1967c-95cb-40b4-8dbb-7716851ca07a', '74da6fc3-9626-4fac-8439-8602e02986bf', 'A) Fluxo, gás e arame sólido;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('23cda7c8-4470-4352-8007-24f32447d800', '74da6fc3-9626-4fac-8439-8602e02986bf', 'B) Fluxo, gás e guia-consumível;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7d699d50-b279-469d-97b8-4765c64729d9', '74da6fc3-9626-4fac-8439-8602e02986bf', 'C) Arame sólido ou arame tubular, fluxo e guia-consumível;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f47c5ac3-18b8-4bcb-a935-091954b9c96b', '74da6fc3-9626-4fac-8439-8602e02986bf', 'D) Arame tubular, gás e fluxo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f03d2e9c-bba5-4a50-b6d7-10ec30b3d7b5', '74da6fc3-9626-4fac-8439-8602e02986bf', 'E) Arame sólido ou arame tubular e guia-consumível.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bb5437fc-bff5-4beb-a676-01df5b3faaff', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 48', 'Resolva a questão', 78)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('949b12d3-8e12-49b7-be15-aa24b76909cf', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'bb5437fc-bff5-4beb-a676-01df5b3faaff', 'multiple_choice', 'Em relação às características do processo de soldagem por eletroescória (ESW), assinale a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fbb4d04a-5797-4699-b1c8-4b96333ddbdb', '949b12d3-8e12-49b7-be15-aa24b76909cf', 'A) O processo de soldagem por eletroescória, assim como os processos: manual com eletrodo revestido, MIG/MAG (GMAW), arco submerso (SAW), entre outros, pertence ao grupo dos processos de soldagem que usam o arco elétrico como fonte de calor;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c9d518a-14f2-4774-8f7a-f0ca6d791162', '949b12d3-8e12-49b7-be15-aa24b76909cf', 'B) A passagem da corrente elétrica pela escória fundida produz uma temperatura, máxima, de 1.400ºC, suficientemente alta para fundir o metal de adição e a peça (feita de aço);', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5f31ca5b-04e5-44f2-bb34-a9f852d2bb75', '949b12d3-8e12-49b7-be15-aa24b76909cf', 'C) O arco elétrico, gerado inicialmente entre o eletrodo e a peça metálica, tem a função apenas de iniciar a soldagem, fundindo o fluxo. Nesse momento, o arco se extingue e a escória fundida passa a ser aquecida pela passagem da corrente elétrica, o que permitirá fundir o eletrodo e a peça;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4cf09450-fab1-4f4f-9767-5779356241ba', '949b12d3-8e12-49b7-be15-aa24b76909cf', 'D) O processo por eletroescória é ideal para ser usado na soldagem de juntas cuja espessura não seja superior a 25 mm;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6b35985b-d586-4b5c-98d3-fa8ae71214a8', '949b12d3-8e12-49b7-be15-aa24b76909cf', 'E) O transformador usado neste processo deve gerar intensidades de corrente na faixa 500 – 1000ºC, para um Ciclo de Trabalho a 100%..', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ff796ad1-9184-4390-873c-0d87c9ee2ad3', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 49', 'Resolva a questão', 79)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('98715a9a-5764-4f1a-9cf4-0d39505fab32', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ff796ad1-9184-4390-873c-0d87c9ee2ad3', 'multiple_choice', 'Das alternativas a seguir, assinale qual delas não é função do fluxo empregado no processo por eletroescória (ESW). ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('19c9cf0d-4ace-44cb-a2cc-570e516fe5fd', '98715a9a-5764-4f1a-9cf4-0d39505fab32', 'A) Conduzir a corrente elétrica de soldagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('08ffdc97-8b81-45e3-8fb1-2f262bfb5792', '98715a9a-5764-4f1a-9cf4-0d39505fab32', 'B) Fornecer calor para fundir o eletrodo e o metal de base;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed33efe7-34de-4ab1-aeb7-3fc7c23afb40', '98715a9a-5764-4f1a-9cf4-0d39505fab32', 'C) Possibilitar uma operação estável;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3c5e91fd-0367-4678-a5ca-53697157bd08', '98715a9a-5764-4f1a-9cf4-0d39505fab32', 'D) Evitar com que a poça de fusão funda as sapatas de cobre;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('13380597-2ed7-4ba8-a3cb-075940ec2c92', '98715a9a-5764-4f1a-9cf4-0d39505fab32', 'E) Proteger o metal fundido do ar atmosférico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('891bf2c6-ded0-42e3-b98f-85696451c520', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 80)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('56a54c1d-3653-4cae-bb48-e833726dbcef', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '891bf2c6-ded0-42e3-b98f-85696451c520', 'multiple_choice', '3 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('504f6856-2636-4740-bbf0-86489d411457', '56a54c1d-3653-4cae-bb48-e833726dbcef', 'A) Tendo em vista que este processo é limitado ao uso de um único eletrodo, a taxa de deposição (kg/h) produzida assemelha-se àquela produzida pelo processo MIG/MAG (GMAW);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8fa4c535-f043-4c3e-934b-127b7b9f4ef3', '56a54c1d-3653-4cae-bb48-e833726dbcef', 'B) Como o deslocamento da fonte de calor durante a soldagem é feito muito lentamente, isto provoca um superaquecimento do metal de base, principalmente em sua ZTA, produzindo, nesta região, grãos extremamente grosseiros;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8fd2355f-f2da-4fdb-a81d-a21edede12be', '56a54c1d-3653-4cae-bb48-e833726dbcef', 'C) Cuidados devem ser tomados no que diz respeito à regulagem da corrente elétrica e tensão, visto que, a proporção que a obra vai-se aquecendo durante a soldagem, os valores dessas variáveis precisam ser reajustados continuamente;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8724015f-53de-43cd-9218-b349bd845b58', '56a54c1d-3653-4cae-bb48-e833726dbcef', 'D) O emprego do processo por eletroescória (ESW) é limitada à junta de topo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2b3ddfa-77e1-4ec2-8dd4-09a7b025651c', '56a54c1d-3653-4cae-bb48-e833726dbcef', 'E) Como no processo por eletroescória (ESW) não são usados dispositivos auxiliares de montagem ao longo da junta, o índice de reparo causado por distorção (embicamento) é extremamente grande.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7fe9068f-b45d-4ccd-9acf-861cf31af8ff', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 51', 'Resolva a questão', 81)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d96e395c-264b-4324-bb25-f5340bc28a38', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7fe9068f-b45d-4ccd-9acf-861cf31af8ff', 'multiple_choice', 'Das descontinuidades possíveis de serem produzidas pelo processo de soldagem por eletroescória (ESW), marque a alternativa que raramente ocorre neste tipo de processo. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cf3afa21-7992-4e73-83bc-db895784bf01', 'd96e395c-264b-4324-bb25-f5340bc28a38', 'A) Trinca interlamelar;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('97328159-aabf-4b40-be8a-e5ed92d56f81', 'd96e395c-264b-4324-bb25-f5340bc28a38', 'B) Falta de fusão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bd632722-6c44-4aa5-8ab8-5e27bef68718', 'd96e395c-264b-4324-bb25-f5340bc28a38', 'C) Inclusão de escória;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('68e01b87-8578-4e44-8040-4fc6052eed18', 'd96e395c-264b-4324-bb25-f5340bc28a38', 'D) Sobreposição;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('42f9d70d-3a26-43b6-8a49-671820996445', 'd96e395c-264b-4324-bb25-f5340bc28a38', 'E) Porosidade.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3319451b-9e42-4e1e-b0d5-f9082aaf774c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 52', 'Resolva a questão', 82)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c2868cf4-316d-4684-8238-17e5510bd5f4', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '3319451b-9e42-4e1e-b0d5-f9082aaf774c', 'multiple_choice', 'Os processos de soldagem por eletroescória (ESW) e por eletrogás (EGW) são semelhantes em muitos aspectos. Assinale a alternativa que diferencia ambos os processos. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f8e0cddb-b1ba-44a1-99df-65b1389ae336', 'c2868cf4-316d-4684-8238-17e5510bd5f4', 'A) Uso de sapatas de cobre para retenção da poça de fusão;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('345fc7fb-67d2-49b4-aa60-c05c2cab0601', 'c2868cf4-316d-4684-8238-17e5510bd5f4', 'B) Os metais de adição podem ser tanto arame sólido como arame tubular;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b5da0580-62cd-4ea8-a589-6775adf650dc', 'c2868cf4-316d-4684-8238-17e5510bd5f4', 'C) Mesmos tipos de fontes de calor;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e11a3a37-6191-435b-b57a-9ff605da8353', 'c2868cf4-316d-4684-8238-17e5510bd5f4', 'D) A soldagem feita em um único passe;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c15ad1b6-0d31-4773-907c-28e979707baa', 'c2868cf4-316d-4684-8238-17e5510bd5f4', 'E) A ZTA das juntas soldadas por ambos os processos apresentam grãos extremamente grosseiros.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('73ee5cc7-46c6-4e16-938a-4f4326dada46', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 53', 'Resolva a questão', 83)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '73ee5cc7-46c6-4e16-938a-4f4326dada46', 'multiple_choice', 'Em relação às características do processo de soldagem por eletrogás (EGW), marque a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88d5aaf4-7a49-4251-b144-337c754ae0b9', 'dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'A) Caso o metal de adição a ser usado na soldagem seja o arame tubular, a atmosfera protetora será realizada pelo gás CO2;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c384c61a-b571-4363-b20c-3b42955f4181', 'dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'B) Empregando o arame sólido como metal de adição, usa-se preferencialmente a mistura gasosa 80% Argônio e 20% CO2;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24b99970-99e6-4855-a4ca-6e970d445f70', 'dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'C) Os metais de base a serem soldados pelo processo por eletrogás (EGW) são os mesmo que podem ser soldados pelo processo MIG/MAG (GMAW);', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('96f47c24-a2a1-4dd3-8672-1e41ef9a895d', 'dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'D) Para o processo por eletrogás (EGW) usa-se corrente do tipo contínua, polaridade inversa;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('68b0d2ee-aeb2-4ffc-9747-a79e9633e1b1', 'dc697f49-f0b8-4174-8fd1-c24832ea16d7', 'E) Não se deve usar o arame tubular auto-protegido como metal de adição, visto a obrigatoriedade do uso de um gás (ou mistura gasosa) na execução da solda.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('32e6265d-4a01-466c-8b1e-91921db3ada0', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 54', 'Resolva a questão', 84)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d23a1662-1899-4190-9a77-4728de25f77c', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '32e6265d-4a01-466c-8b1e-91921db3ada0', 'multiple_choice', 'Das descontinuidades possíveis de serem produzidas pelo processo de soldagem por eletrogás (EGW), marque a alternativa que raramente ocorre neste tipo de processo. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9dc71a2f-028c-42da-847b-2a6d11f618be', 'd23a1662-1899-4190-9a77-4728de25f77c', 'A) A porosidade pode ser produzida neste processo, quando houver algum tipo de vazamento de água, utilizada para resfriar as sapatas;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bdb68482-1ac9-4b80-b8e2-ad66aaea0e8f', 'd23a1662-1899-4190-9a77-4728de25f77c', 'B) O surgimento de trincas a frio são extremamente raros, tanto no metal de solda, quanto na ZTA. tendo em vista que a velocidade de resfriamento da junta soldada por este processo é muito lenta;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('66494995-2e3e-4a95-9e42-67e3be87ce1e', 'd23a1662-1899-4190-9a77-4728de25f77c', 'C) Trincas a quente são possíveis de serem produzidas, caso o metal de base tenha em sua composição química altos teores de enxofre;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eddfb289-c77b-407c-859f-0bb9ea371469', 'd23a1662-1899-4190-9a77-4728de25f77c', 'D) Concavidade excessiva é uma descontinuidade típica, quando a velocidade de soldagem adotada é muito superior àquela estabelecida na EPS;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f5138f4-9731-4d84-816f-d8bc2808330f', 'd23a1662-1899-4190-9a77-4728de25f77c', 'E) Descontinuidade do tipo sobreposição ocorre, quando as sapatas de cobre são mal posicionadas.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5cb0a312-3848-44df-be8a-ab6b749e862a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 85)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7f39369e-4ee3-4ec4-a9aa-895fc2f7b970', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '5cb0a312-3848-44df-be8a-ab6b749e862a', 'multiple_choice', '5 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4072309b-7989-4698-9bb3-5282465b8dec', '7f39369e-4ee3-4ec4-a9aa-895fc2f7b970', 'B) O alimentador de arame relativo a este processo é similar ao utilizado no processo MIG/MAG (GMAW) automatizado;;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a146deb-1109-4b62-b8c2-09e865a84dc7', '7f39369e-4ee3-4ec4-a9aa-895fc2f7b970', 'C) Há um mecanismo próprio responsável pela oscilação da pistola de soldagem;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83f48a17-6474-4afd-864b-d52797e88185', '7f39369e-4ee3-4ec4-a9aa-895fc2f7b970', 'D) Para o caso do uso de arame sólido ou arame tubular com proteção gasosa, é fundamental a presença de equipamento para suprir o gás de proteção', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a5d7be9d-afa5-46c6-ae5f-b1431c8c7bb5', '7f39369e-4ee3-4ec4-a9aa-895fc2f7b970', 'E) As sapatas utilizadas neste processo são feitas de cobre, apresentando em seu interior canais que permitem a passagem de água para a sua refrigeração.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8a244715-81f8-4836-9c3e-964398cd54d7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 56', 'Resolva a questão', 86)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '8a244715-81f8-4836-9c3e-964398cd54d7', 'multiple_choice', 'Identifique a seguir qual alternativa não corresponde aos consumíveis de soldagem empregados no processo de soldagem por eletrogás (EGW). ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2366a36-489b-4f15-a82d-19999c5b225a', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'A) Guia-consumível, arame sólido, gás (quando necessário) e fluxo;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f129905-077b-4814-afd7-f7051a39b953', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'B) Arame tubular (podendo ser tanto o “auto-protegido”, quanto o que necessita de uma proteção externa de gás) ou arame sólido e gás (quando necessário);', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('350455d9-93dd-47a8-971b-3bae9efbe380', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'C) Fluxo, guia-consumível e, arame sólido;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b0ca09e5-045c-4f27-ac21-9e82edcdae8f', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'D) Arame tubular (“auto-protegido”), gás e fluxo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2dbad05e-a145-4783-a855-0137b5c339ad', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'E) Arame tubular (que necessita de uma proteção externa de gás), guia- consumível e fluxo;', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45c140fd-e1f1-4ca4-b9c6-0340930b1c3a', '43fb690f-0267-4550-8948-f5ea8f8fa6b0', 'F) Fluxo, guia-consumível e arame sólido.', false, 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('10836ac8-01a4-4492-8b20-5eabf8bc3d0e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 58', 'Resolva a questão', 87)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3d2561d9-af01-4fc8-8774-639e6feff630', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '10836ac8-01a4-4492-8b20-5eabf8bc3d0e', 'multiple_choice', 'Para que um aço possa ser cortado por um processo a gás (oxi-corte, por exemplo), é necessário que umas etapas sejam cumpridas. Assinale a alternativa a seguir que não condiz com o mecanismo. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c55d573-6187-48ad-a859-52c57b18e310', '3d2561d9-af01-4fc8-8774-639e6feff630', 'A) A temperatura de ignição é atingida pelo pré-aquecimento da região que será cortada através de chamas produzidas pelo gases combustível e comburente;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83436a45-2d54-49f7-812b-2224f8b19de7', '3d2561d9-af01-4fc8-8774-639e6feff630', 'B) O corte, propriamente dito, inicia-se só após a região de peça preaquecida atingir a temperatura de ignição;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12f539d0-4bb5-4f3e-9a00-ce4139000a4f', '3d2561d9-af01-4fc8-8774-639e6feff630', 'C) O fato principal que permite a realização do corte de aços são as baixas temperaturas de fusão dos diferentes tipos de óxidos de ferro (comparadas com a temperatura de fusão do ferro) formados no momento em que o oxigênio reage com o ferro do metal base;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('82a2f143-af73-4040-9b97-f0b0349d0c91', '3d2561d9-af01-4fc8-8774-639e6feff630', 'D) Os principais óxidos de ferro, formados na reação entre este metal (no estado puro) e o oxigênio, são: Fe2O3, FeO e Fe3O4;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4318450c-3518-43a1-923a-0fd09e99787a', '3d2561d9-af01-4fc8-8774-639e6feff630', 'E) A temperatura de ignição do ferro é a mesma do que a sua temperatura de fusão. Assim que a chama de pré-aquecimento atingir àquele valor, o jato de oxigênio é acionado, dando início ao processo de corte.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8de2a25e-1999-4539-8835-d27088c1b866', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 59', 'Resolva a questão', 88)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4df8db66-446c-4da7-93ae-d22753b30e7b', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '8de2a25e-1999-4539-8835-d27088c1b866', 'multiple_choice', 'A seguir, são apresentadas 5 alternativas, entre as quais uma não representa um gás combustível empregado no corte a gás. Assinale-a. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5538b9a8-4f8d-42ce-91ad-bae1dd844f60', '4df8db66-446c-4da7-93ae-d22753b30e7b', 'A) Gasolina (sob a forma de vapor);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ea63266-a691-4424-83c2-c2dbe74827c7', '4df8db66-446c-4da7-93ae-d22753b30e7b', 'B) Argônio;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d3d63472-c698-49f7-98e2-aa1e55a31986', '4df8db66-446c-4da7-93ae-d22753b30e7b', 'C) Propano;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d565acb2-8720-465e-81e2-a81fd652ddfd', '4df8db66-446c-4da7-93ae-d22753b30e7b', 'D) Propileno;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e4304544-18f0-465b-91d5-d71c382334ba', '4df8db66-446c-4da7-93ae-d22753b30e7b', 'E) Acetileno.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('65fe9d61-e38d-4a74-a799-72a30ff880d5', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 89)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('15d53504-b911-4b1f-a042-2b6e5f309ffd', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '65fe9d61-e38d-4a74-a799-72a30ff880d5', 'multiple_choice', '7 ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9276173d-dbdc-45b1-8ef5-14c0bbd73e9c', '15d53504-b911-4b1f-a042-2b6e5f309ffd', 'C) Entre todos os gases combustíveis, é aquele que, para produzir uma chama de pré-aquecimento, participa com 0,5 volume de gás (exemplo, 0,5 m3) para cada 1 volume (exemplo, 1 m3) de Oxigênio;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4284c5e8-63b9-4168-8003-faba7a9d5383', '15d53504-b911-4b1f-a042-2b6e5f309ffd', 'D) Grande quantidade de profissionais encontrados no mercado que sabem operar com este gás;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2b41fef1-7a7f-43c1-a960-dba3824af017', '15d53504-b911-4b1f-a042-2b6e5f309ffd', 'E) A chama produzida, utilizando este gás, atinge a uma temperatura suficientemente alta para cortar materiais ferrosos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('546b62f5-ff09-432a-b268-ab0f84916e3d', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 61', 'Resolva a questão', 90)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '546b62f5-ff09-432a-b268-ab0f84916e3d', 'multiple_choice', 'Qual dos metais (ligas metálicas) listados a seguir não necessita do uso de fluxo e pó metálico para ser cortado pelo processo a gás? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d7528d5-c597-44b9-a906-49516b1b0c6f', '6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'A) Ferro fundido;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9db148e-88a9-4ceb-af18-79119eb05c85', '6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'B) Bronze;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1af727be-de4b-4ad9-9ac1-3995b4764765', '6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'C) Alumínio;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6e5f66c7-e1ad-40c4-b29b-4f3426948264', '6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'D) Aço, contendo 10%Ni;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('590dc201-8ca0-47c7-a4cf-9eb772fc7a0e', '6490efc1-6487-44e9-95c9-8b9bd469e4c7', 'E) Aço, contendo 0,15%C, 0,3%Si e 1,5%Mn.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b46e17ef-bf52-45dd-9c8d-0a384237d010', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 62', 'Resolva a questão', 91)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('18bde3e1-b949-4165-85d9-231e2ca80e41', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'b46e17ef-bf52-45dd-9c8d-0a384237d010', 'multiple_choice', 'Em relação ao corte, ou remoção, de materiais ferrosos empregando “eletrodo de carvão” ou “grafite”, identifique a alternativa informada incorretamente. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a057185-892f-4555-8b0b-c34ac28d813b', '18bde3e1-b949-4165-85d9-231e2ca80e41', 'A) A única função do revestimento de cobre é facilitar a abertura e a manutenção do arco elétrico;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('97c9dd28-68d7-4575-9de0-a89c4111fbfd', '18bde3e1-b949-4165-85d9-231e2ca80e41', 'B) Tendo em vista que o carvão (grafite), utilizado como material base do eletrodo, é muito quebradiço, é necessário que seja aplicado um revestimento à base de cobre (externo) para conferir uma resistência ao choque;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('02e29b35-ffe4-4eb7-95ce-1f994588e5a3', '18bde3e1-b949-4165-85d9-231e2ca80e41', 'C) Dos tipos de eletrodos de grafite, há um tipo específico para fontes de energia que operam com corrente contínua e um outro tipo para fontes que operam com corrente alternada ;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dbd3091c-9fc0-452a-9d17-f88b0f985097', '18bde3e1-b949-4165-85d9-231e2ca80e41', 'D) Devido à presença de placas de carbono depositadas na região após uso do eletrodo de carvão, é necessário que se promova uma limpeza da região afetada, objetivando a remoção desse material;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2704a2ee-fe3e-481b-b9b8-c2a81e56ea13', '18bde3e1-b949-4165-85d9-231e2ca80e41', 'E) Necessidade do uso de ar comprimido durante a operação para expulsar o metal líquido da região.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('eb1fa973-e3cb-49ae-845b-630015eda7ae', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 63', 'Resolva a questão', 92)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('465d55db-9f6e-4554-b751-7f285cdb920f', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'eb1fa973-e3cb-49ae-845b-630015eda7ae', 'multiple_choice', 'Em relação ao corte, ou remoção, de materiais ferrosos empregando “eletrodo de carvão” ou “grafite”, identifique a alternativa informada incorretamente. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa32ec19-0c93-4644-9131-8358ac66b491', '465d55db-9f6e-4554-b751-7f285cdb920f', 'A) Processo que pode ser usado em todas as posições;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('16681f91-fd6e-45c7-98b7-53b9bdd56c20', '465d55db-9f6e-4554-b751-7f285cdb920f', 'B) Metais do tipo: aço, aço inoxidável, ligas de cobre e de níquel, e alguns tipos de ferro fundidos podem sem cortados pelo eletrodo de carvão;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('52b85bd2-8c3c-475d-80be-d5f407e4bdd7', '465d55db-9f6e-4554-b751-7f285cdb920f', 'C) De tão simples o seu manuseio, não é exigida habilidade do profissional para a execução do trabalho;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7ebb150a-240e-434e-a7af-aed69838279b', '465d55db-9f6e-4554-b751-7f285cdb920f', 'D) Fundamental o uso de fontes de energia do tipo retificadores (corrente contínua), ligados na polaridade direta;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a5fc3da3-7ac5-484a-b780-c922361e1a54', '465d55db-9f6e-4554-b751-7f285cdb920f', 'E) Todos os tipos de fonte de energia (gerador, transformador e retificador) podem ser usados na execução desta tarefa.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ea8c59ac-d565-4fdb-be1a-ccd06e7fd28d', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 64', 'Resolva a questão', 93)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'ea8c59ac-d565-4fdb-be1a-ccd06e7fd28d', 'multiple_choice', 'Comparando os processos de corte com eletrodo de carvão (grafite) e o corte a gás, identifique a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('815ceb49-4e10-478f-916a-78dd3a46992c', '2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'A) Diferentemente do processo de corte oxi-gás, os metais a serem cortados pelo processo com eletrodo de carvão são fundidos pelo calor gerado de um arco entre o eletrodo e a peça;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5145ddc5-cb80-4d43-a115-e94d25e47f2a', '2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'B) O processo de corte com eletrodo de carvão é uma técnica manual, não podendo ser operada automaticamente;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9295682a-f60a-4dee-af5f-ab48fa65d612', '2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'C) Ambos os processos podem ser usados em todas as posições;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b28d1c8-525c-421b-ad07-6a07ca44d5c7', '2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'D) Tendo em vista que o aporte térmico introduzido na região do corte feito com o eletrodo de carvão é menor do que o corte feito com chama (mistura dos gases combustível e comburente), a distorção produzida é menor quando usado o eletrodo de carvão;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be3b0c17-8afb-4e78-af3f-e547a195a076', '2d9dedac-91b9-44fb-bb43-a6fe064e5338', 'E) A ZTA produzida pelo corte com carvão é menor do que usando a técnica com chama.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2b1589e2-d7ad-4290-aa26-bf324603b1dd', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 94)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8a46a4b2-cf34-491b-a3fd-4b4fc52ba25e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '2b1589e2-d7ad-4290-aa26-bf324603b1dd', 'multiple_choice', '9 requisitos de energia das fontes para corte com grafite são normalmente maiores, comparando com as fontes utilizadas na soldagem; ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8155c31a-7475-45bd-a16f-c50c897f031e', '8a46a4b2-cf34-491b-a3fd-4b4fc52ba25e', 'D) Os consumíveis usados nesta técnica são o ar comprimido, o eletrodo de carvão e o fluxo necessário para aumentar o rendimento do processo;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d6ecf849-1dc5-49ff-811e-b21beffd11eb', '8a46a4b2-cf34-491b-a3fd-4b4fc52ba25e', 'E) Tendo em vista a presença de placas de carbono (resíduo do processo de corte com eletrodo de carvão) na superfície da região goivada ou cortada, a sua remoção deve ser feita pela técnica de esmerilhamento, sendo obrigatório o uso posterior da escova rotativa. A função desta escova é retirar os resíduos não removidos inicialmente pelo disco de esmeril.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8ff73132-5e85-4090-8e03-3eaff80409ad', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 66', 'Resolva a questão', 95)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '8ff73132-5e85-4090-8e03-3eaff80409ad', 'multiple_choice', 'Quanto às alternativas apresentadas a seguir abordando o corte a plasma de materiais metálicos, identifique aquela informada incorretamente. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c42ef5a-ca97-4432-a3d2-81da7dff610f', '39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'A) A técnica de corte a plasma é indicada para ser empregada no corte de qualquer material metálico (ferroso e não-ferroso), tendo em vista que o arco de plasma atinge a temperaturas em torno de 15.000 ºC;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a41e673d-216d-4c84-8444-b74c2c65fa26', '39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'B) O corte a plasma pode ser feito tanto manual, quanto automaticamente;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('618ab98f-32a8-4c86-9d25-a4e047a3309a', '39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'C) A qualidade da superfície cortada com a técnica a plasma é de ótimo padrão;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d45ee72c-5561-465a-ade1-7d7b85bc7439', '39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'D) A fonte de energia indicada para esta técnica é o retificador (corrente contínua);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3c4539e9-f07c-47ff-9000-bca939e901a0', '39c7f74e-7bfd-403e-95d7-a8ffc705b64e', 'E) Visto as altas temperaturas do arco gerado pelo plasma, associada à alta potência da fonte de energia, esta técnica permite cortar peças com espessuras de até 500 mm.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7a19c774-a5d7-471d-ae50-623f8e035295', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 96)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ec95e74a-f5e5-48ea-b224-bcc375c42b29', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7a19c774-a5d7-471d-ae50-623f8e035295', 'multiple_choice', '0 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6069e444-a844-4c9b-9006-500da8f37a4f', 'ec95e74a-f5e5-48ea-b224-bcc375c42b29', 'D) Comparando especificamente o corte a plasma com o corte com eletrodo de carvão, o primeiro tem a grande vantagem de poder realizar o corte sem que a peça precise estar energizada, quando é usada uma torcha que produz um arco do tipo “não transferido”;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0a1347cb-0634-432e-b1ef-cfcec1b3ed9b', 'ec95e74a-f5e5-48ea-b224-bcc375c42b29', 'E) A temperatura do arco elétrico gerada no corte a plasma é bem maior do que a temperatura produzida pela chama proveniente do corte a gás.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('85d905ed-6a05-4aaa-8db3-6af48d65b122', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 68', 'Resolva a questão', 97)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('457f8d84-6e6d-4f6a-885e-747d121aac69', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '85d905ed-6a05-4aaa-8db3-6af48d65b122', 'multiple_choice', 'Qual dos equipamentos apresentados a seguir não pertence ao conjunto necessário para realizar cortes com plasma? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8a85f87c-e3ac-4214-84eb-a48a3e8801b4', '457f8d84-6e6d-4f6a-885e-747d121aac69', 'A) Fornecimento de gases (cilindros ou tanques);', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff249468-0b4e-4f69-bb9f-4a24da43ee88', '457f8d84-6e6d-4f6a-885e-747d121aac69', 'B) Sistema para refrigeração da torcha à base de água;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d1b3fe0c-0ed7-4aa0-bde5-16afc70f06b3', '457f8d84-6e6d-4f6a-885e-747d121aac69', 'C) Torcha de corte;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ffa7ad66-c75f-4c05-8c54-4d1bd41d952d', '457f8d84-6e6d-4f6a-885e-747d121aac69', 'D) Fonte de alta frequência;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fe979d24-4168-4b6d-924c-7219e924a9da', '457f8d84-6e6d-4f6a-885e-747d121aac69', 'E) Fonte de energia (Retificador/Gerador).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9b7592f1-0587-46e1-be23-b0c256a08c50', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 69', 'Resolva a questão', 98)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('20dc5b95-e299-471a-9c54-4d8463c48eb1', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '9b7592f1-0587-46e1-be23-b0c256a08c50', 'multiple_choice', 'No processo de corte a plasma, há um tipo de gás (ou mistura) usado na formação do plasma e um outro tipo de gás usado como gás de proteção. Identifique a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('074f47d1-3312-48b4-bfe7-664643c5f13c', '20dc5b95-e299-471a-9c54-4d8463c48eb1', 'A) Gás de proteção na soldagem do Alumínio: mistura de Argônio + H2;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('07ed048b-8c6d-4ecd-a625-1507cabf19be', '20dc5b95-e299-471a-9c54-4d8463c48eb1', 'B) Gás de plasma na soldagem do aço inoxidável: CO2; mistura de Argônio + CO2 + O2;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7de26888-12fc-4bc9-93a8-354fd45ae685', '20dc5b95-e299-471a-9c54-4d8463c48eb1', 'C) Gás de proteção na soldagem de aço carbono: Argônio puro; mistura de Argônio + CO2;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88737c80-2ef8-45f8-ad02-2f806c503611', '20dc5b95-e299-471a-9c54-4d8463c48eb1', 'D) Gás de plasma na soldagem do Titânio: Argônio puro;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('448e7fc2-eb42-4e94-aa65-23fa74159908', '20dc5b95-e299-471a-9c54-4d8463c48eb1', 'E) Gás de plasma de metais não-ferrosos: mistura de N2 + H2.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7ce80c19-6956-4cc8-a544-6561130c6cca', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 99)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('94217dcb-21e6-4c59-a27b-558ee1fa24b5', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7ce80c19-6956-4cc8-a544-6561130c6cca', 'multiple_choice', '1 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8ce6b780-2a6f-4801-950e-fc6a21b9b8b9', '94217dcb-21e6-4c59-a27b-558ee1fa24b5', 'C) Os soldadores podem trabalhar com relativo conforto, enquanto o aquecimento é realizado, não precisando interromper o trabalho para ajustar a temperatura de preaquecimento;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6c5647d4-4cb8-4d26-9299-1023b04fc319', '94217dcb-21e6-4c59-a27b-558ee1fa24b5', 'D) O aquecimento produzido por esta técnica pode ser mantido durante a operação de soldagem.;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e1d1bf01-137d-4f84-a2bc-1b2b0f298cf2', '94217dcb-21e6-4c59-a27b-558ee1fa24b5', 'E) O aquecimento produzido por esta técnica pode ser feito de forma contínua e uniforme.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f9fd69cc-90c6-4e0d-a36c-54a0cd79eeba', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 71', 'Resolva a questão', 100)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('af70b6cf-28e9-4720-ae81-c188e4470c7a', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'f9fd69cc-90c6-4e0d-a36c-54a0cd79eeba', 'multiple_choice', 'No que diz respeito à técnica conhecida como “Aquecimento por Chama”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('809d3f01-63ea-48b0-8b65-38f54812901f', 'af70b6cf-28e9-4720-ae81-c188e4470c7a', 'A) É um processo eficiente e econômico;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('926af3f7-ae30-46de-ae05-eaaf86b90ec5', 'af70b6cf-28e9-4720-ae81-c188e4470c7a', 'B) É adequado para serviços no campo em peças relativamente pequenas;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e6f602ac-1ce6-4622-a732-d3a974771b4b', 'af70b6cf-28e9-4720-ae81-c188e4470c7a', 'C) É uma técnica precisa, com um controle total da temperatura ao longo da seção que está sendo aquecida;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('94ae5317-95ec-4698-9f65-79390220d93e', 'af70b6cf-28e9-4720-ae81-c188e4470c7a', 'D) Equipamentos fáceis de serem transportados;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('545170f9-05d7-462d-9c3e-e37292ae28fd', 'af70b6cf-28e9-4720-ae81-c188e4470c7a', 'E) É uma técnica que exige cuidados na operação, pois, caso haja algum descontrole no aquecimento, é possível que o trabalho seja inviabilizado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f4071d43-4b4b-4f20-a186-51f4ceb08352', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 72', 'Resolva a questão', 101)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2dc50b56-d84b-43d8-a392-47f2eeddad66', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'f4071d43-4b4b-4f20-a186-51f4ceb08352', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique aquela que não é uma vantagem da técnica conhecida como “Aquecimento por Indução”. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('566df502-4c69-4dc6-9bf5-603b5f011de3', '2dc50b56-d84b-43d8-a392-47f2eeddad66', 'A) A fonte de energia usada nesta técnica é pequena, sendo facilmente transportada para lugares de difícil acesso;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2552368f-bad6-422e-9636-084ca0be704f', '2dc50b56-d84b-43d8-a392-47f2eeddad66', 'B) As bobinas usadas para o aquecimento têm uma vida útil longa;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('109f4ed6-0768-455e-8125-91c70a770d96', '2dc50b56-d84b-43d8-a392-47f2eeddad66', 'C) Atinge-se rapidamente às temperaturas estabelecidas para a realização do tratamento indicado;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('34ef046e-ce44-4dd2-9155-6fdce3c30b14', '2dc50b56-d84b-43d8-a392-47f2eeddad66', 'D) Obtém-se pouca variação de temperatura na seção que está sendo aquecida;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('57a6e458-c654-4443-a55d-132bf78684e1', '2dc50b56-d84b-43d8-a392-47f2eeddad66', 'E) Esta técnica pode produzir um aquecimento em uma grande seção da obra, não se restringindo apenas a uma pequena região da mesma.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7dba5fa4-f253-4854-af88-e48d58ef9aad', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', 'activity', 'Questão 1', 'Resolva a questão', 102)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'a1435d9b-c1f8-40e6-9e71-4553f29b1ff1', '7dba5fa4-f253-4854-af88-e48d58ef9aad', 'multiple_choice', '2 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eb3adbf4-904e-4e17-8586-14b8994bce58', 'e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'A) Aquecimento “por chama”: das 3 técnicas apresentadas é a que fornece grande capacidade de mobilização;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('996d1cec-11ee-4602-84ef-481a1e167178', 'e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'B) Aquecimento “por indução”: pode ocorrer abertura de arco elétrico entre a resistência e a peça tratada;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e3ad4b47-4260-46e6-a6eb-d914413f2ec1', 'e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'C) Aquecimento “por resistência elétrica”: tem como maior vantagem produzir altas velocidades de aquecimento;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5910d5e5-817c-48a7-a10b-cc911cd0a62c', 'e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'D) Aquecimento “por resistência elétrica”: apresenta como vantagem do processo o uso de bobinas de longa duração;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6bef46d3-1196-4289-b58a-83e2692734b9', 'e2ad51bd-d15a-432c-bafa-fbdde9f822d2', 'E) Aquecimento “por indução”: esta técnica permite que a soldagem não seja interrompida, quando houver a necessidade de aquecer a peça..', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('ebd489e8-6818-4635-adac-b057084320a9', 'c5555555-5555-5555-5555-555555555555', 'Metais de Base', 'Questões e atividades sobre Metais de Base', 4, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('68dbf375-9362-439a-a5b3-155e4b69feb7', 'ebd489e8-6818-4635-adac-b057084320a9', 'Prática - Metais de Base', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0b6bbaf0-2d79-4ae7-91a4-2056e912be33', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('69723b26-2b90-4738-abcd-f377ef413e6e', '68dbf375-9362-439a-a5b3-155e4b69feb7', '0b6bbaf0-2d79-4ae7-91a4-2056e912be33', 'multiple_choice', 'Qual especificação (norma ou código) listada a seguir padroniza as características mecânicas e químicas dos metais ferrosos, não ferrosos, materiais não metálicos e outros materiais? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88def793-4d29-4d09-94b7-4c3adb52d14c', '69723b26-2b90-4738-abcd-f377ef413e6e', 'F) ASM (American Society for Metals)', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fc42198d-8dba-4467-8bf0-8e92c9a6a609', '69723b26-2b90-4738-abcd-f377ef413e6e', 'G) ASME (American Society of Mechanical Engineers).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('132b3326-152f-4a83-9eb5-83bef29b72fb', '69723b26-2b90-4738-abcd-f377ef413e6e', 'H) AWS (American Welding Society).', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c1ef3ba-ba7c-457f-97f8-d4b99672971a', '69723b26-2b90-4738-abcd-f377ef413e6e', 'I) ASTM (American Society for Testing and Materials)', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9cbce5c5-29e8-4fbd-ae56-43b652f07e77', '69723b26-2b90-4738-abcd-f377ef413e6e', 'J) AISI (American Iron and Steel Institute).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2f1e9f72-9196-461b-8a59-cc091ccaa00d', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b820452c-7e68-44fc-accf-f0ade93ceccd', '68dbf375-9362-439a-a5b3-155e4b69feb7', '2f1e9f72-9196-461b-8a59-cc091ccaa00d', 'multiple_choice', 'Analisando a especificação ASTM E 340-95 (98) b, identifique a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d1e6041c-dd68-4703-8332-84c0ce9f89df', 'b820452c-7e68-44fc-accf-f0ade93ceccd', 'F) A letra “E” representa um eletrodo.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('98433062-d490-4a53-afa6-2ba28f32b26d', 'b820452c-7e68-44fc-accf-f0ade93ceccd', 'G) O número “340” corresponde especificamente a um determinado tipo de material.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2158fb2c-3314-4a66-9aa9-90db0e1e4c09', 'b820452c-7e68-44fc-accf-f0ade93ceccd', 'H) O número “95” indica o ano de emissão original da especificação ou de adoção como norma.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2e23003-a209-4eff-9e21-b3d9b579c4dc', 'b820452c-7e68-44fc-accf-f0ade93ceccd', 'I) O número “98” indica o ano quando foi realizada a primeira revisão da especificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dddcffed-338d-4378-bba4-f245426592be', 'b820452c-7e68-44fc-accf-f0ade93ceccd', 'J) A letra “b” (minúscula) indica que em 1998 foram realizadas duas revisões referentes ao texto original.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('872475d8-c90c-464f-8d7d-61d349acc98e', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('47762f6e-e357-4739-8bf6-5e11397e43e1', '68dbf375-9362-439a-a5b3-155e4b69feb7', '872475d8-c90c-464f-8d7d-61d349acc98e', 'multiple_choice', 'Analisando a especificação ASTM A 370-91 (92) T, identifique a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7864a26f-e170-4dc1-94ad-5f83e0830138', '47762f6e-e357-4739-8bf6-5e11397e43e1', 'A) A letra “A” representa que o metal de base em questão é o Alumínio.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5331c4c2-05ce-4f2f-98df-a24673a26c87', '47762f6e-e357-4739-8bf6-5e11397e43e1', 'B) O número “370” corresponde ao tipo de liga de Alumínio.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a4e4772f-d6fc-4cde-8047-6addef27e31e', '47762f6e-e357-4739-8bf6-5e11397e43e1', 'C) O número “91” indica o ano quando foi realizada a primeira revisão da especificação.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4ab20026-09fa-40ba-b117-a695ee7ead6c', '47762f6e-e357-4739-8bf6-5e11397e43e1', 'D) O número “92” indica o ano da última reaprovação, sem alteração, da norma.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb4a73c7-89cd-4068-9811-cda0e02547a2', '47762f6e-e357-4739-8bf6-5e11397e43e1', 'E) A letra “T” significa que o metal em questão trata-se de um tubo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8953cd35-65b1-4062-a0d9-4ab3d5af559e', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('930fd092-e877-4912-ae08-a7c3eb10d50e', '68dbf375-9362-439a-a5b3-155e4b69feb7', '8953cd35-65b1-4062-a0d9-4ab3d5af559e', 'multiple_choice', 'Analisando as classificações dos aços apresentados a seguir, identifique a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ebf0d8c-7360-4825-a4f8-62ace56527c1', '930fd092-e877-4912-ae08-a7c3eb10d50e', 'A) Os aços com classificação AISI “318” e “318Mo” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta  teores de molibdênio e oxigênio maiores do que o primeiro.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a468983d-c5de-4bad-9201-35ca6c0da68a', '930fd092-e877-4912-ae08-a7c3eb10d50e', 'B) Os aços com classificação AISI “317” e “317L” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta um teor de lantânio maior do que o primeiro.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('615ffa92-5a2e-4341-94a4-b32edab17d13', '930fd092-e877-4912-ae08-a7c3eb10d50e', 'C) Os aços com classificação AISI “202” e “430FSe” possuem as mesmas composições químicas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b0c245f-ac3a-493a-aa87-47e396264663', '930fd092-e877-4912-ae08-a7c3eb10d50e', 'D) Os aços com classificação AISI “416” e “416Se” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo aço possui um teor de enxofre maior do que o primeiro.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('750bb848-53fd-46df-81fd-f409be918cd9', '930fd092-e877-4912-ae08-a7c3eb10d50e', 'E) Os aços com classificação AISI “321” e “321H” possuem composições químicas muito semelhantes. O que difere ambos é que o segundo apresenta um teor de carbono maior do que o primeiro.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('532f95e7-3d85-49b1-8bf5-b27943c18298', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', '68dbf375-9362-439a-a5b3-155e4b69feb7', '532f95e7-3d85-49b1-8bf5-b27943c18298', 'multiple_choice', 'Quanto à classificação AISI relativa aos aços inoxidáveis – X YY a – marque a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58692e3e-f294-4d98-94d7-9a290f7d8910', '47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', 'A) A letra “X” indica a microestrutura do metal de base.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a4129b88-de64-4df0-a9d9-e4cf5e9dc79f', '47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', 'B) As letras “YY” significam os elementos químicos que se diferenciam dos elementos principais da liga.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6a1e3ad3-d084-4db8-b9c3-55db44c9b664', '47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', 'C) A letra “X” significa o elemento químico principal da liga.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4e7ac87-e567-4be3-8505-a7c1f77e0e5d', '47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', 'D) A letra “a” particulariza uma determinada faixa de composição química para cada tipo de aço.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dfe36adf-0168-487b-ac90-8cba8c5a2881', '47ccb53c-88e6-4b4b-bdaf-4701ea4e9182', 'E) A letra “X” significa se a forma de fabricação: chapa ou tubo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('67050f6c-def0-4067-b3f9-2c1ed13d2b9c', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 1', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8b1e6563-d208-45e9-a6af-0e0e25ae3409', '68dbf375-9362-439a-a5b3-155e4b69feb7', '67050f6c-def0-4067-b3f9-2c1ed13d2b9c', 'multiple_choice', '3 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff2b56fb-5327-4818-ba9f-58efa8593103', '8b1e6563-d208-45e9-a6af-0e0e25ae3409', 'D) Os aços com classificação AISI “304” e “304N” possuem composições químicas muito semelhantes, porém, o segundo aço possui um certo teor de nitrogênio, diferentemente do primeiro que não possui este elemento em sua composição química.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a81190f7-c094-4141-a166-430fc716234c', '8b1e6563-d208-45e9-a6af-0e0e25ae3409', 'E) Os aços com classificação AISI “201” e “446” possuem composições químicas completamente diferentes entre si.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0fec285e-1103-43f4-859e-9c86208ca85e', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 7', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8866a8d2-e34d-4222-b752-61821eafe3ff', '68dbf375-9362-439a-a5b3-155e4b69feb7', '0fec285e-1103-43f4-859e-9c86208ca85e', 'multiple_choice', 'Analisando as classificações AISI dos aços apresentados a seguir, identifique qual a alternativa mostra uma relação correta entre as classificações e a microestrutura dos metais. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('44672d92-ef3e-4414-80b7-72a9fd24c6a5', '8866a8d2-e34d-4222-b752-61821eafe3ff', 'A) AISI 205 e AISI 430 – Microestrutura austenítica', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('642225ff-3361-4aab-ab4c-d1a3e9e5263b', '8866a8d2-e34d-4222-b752-61821eafe3ff', 'B) AISI 429 e AISI 316L – Microestrutura austenítica', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('50bc7567-7e8d-4fd9-beb4-59b84c6cc617', '8866a8d2-e34d-4222-b752-61821eafe3ff', 'C) AISI 202 e AISI 347 – Microestrutura austenítica', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46d6cdd0-43a1-40a9-b001-afc105012381', '8866a8d2-e34d-4222-b752-61821eafe3ff', 'D) AISI 201 e AISI 308MoL – Microestrutura martensítica', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c78827e-ea3e-4fe5-8ce9-b2140496cbac', '8866a8d2-e34d-4222-b752-61821eafe3ff', 'E) AISI 309 e AISI 436 – Microestrutura austenítica', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('82492e50-194c-47fc-a2f1-7825268292ef', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('368c3c80-6bc3-4398-85c5-ea1bee3308f0', '68dbf375-9362-439a-a5b3-155e4b69feb7', '82492e50-194c-47fc-a2f1-7825268292ef', 'multiple_choice', 'Quanto ao estudo dos metais de base, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3efb04d0-358b-4b08-9bec-48ac5d311eeb', '368c3c80-6bc3-4398-85c5-ea1bee3308f0', 'A) A especificação AISI estabelece as condições de teste de material, de forma a garantir as propriedades mecânicas mínimas exigidas.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21b4d654-9b4e-4d74-a393-d5072349f7c1', '368c3c80-6bc3-4398-85c5-ea1bee3308f0', 'B) De uma forma generalizada, a Classificação define uma sistemática de arranjo ou divisão dos materiais em grupos, baseada em características similares como a composição química.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f493ed43-2e24-401a-9e45-32f5569feb4f', '368c3c80-6bc3-4398-85c5-ea1bee3308f0', 'C) A especificação ASTM estabelece as condições de teste de material, de forma a garantir as propriedades mecânicas mínimas exigidas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3dfa4703-7fff-44ee-8bd7-0e2fb5d3b8b8', '368c3c80-6bc3-4398-85c5-ea1bee3308f0', 'D) A classificação AISI estabelece apenas uma única maneira de designar seus metais, a saber: através da composição química.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65a0ed72-616d-4c79-bea5-a283c44f575d', '368c3c80-6bc3-4398-85c5-ea1bee3308f0', 'E) De uma maneira generalizada, a Especificação é uma descrição precisa de um conjunto de requisitos a serem satisfeitos por um determinado material.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('daa1c1bf-9eca-4bf8-a024-97237c3f048f', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 10', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('30fbbf23-af05-4dee-9ecc-71f6fd21cdec', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'daa1c1bf-9eca-4bf8-a024-97237c3f048f', 'multiple_choice', 'A designação A do sistema de identificação de materiais da ASTM (exemplo: ASTM A 370), é aplicada para que tipo de material? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4154a2f6-b47d-4021-97e9-75c790f2835d', '30fbbf23-af05-4dee-9ecc-71f6fd21cdec', 'F) Metais não ferrosos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9c46f0e1-8d70-4516-9128-e1203cec6ff3', '30fbbf23-af05-4dee-9ecc-71f6fd21cdec', 'G) Aglutinantes.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0ffd58c2-cc78-4fe1-8596-bbc3d9eca559', '30fbbf23-af05-4dee-9ecc-71f6fd21cdec', 'H) Materiais para sinterização.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a193d585-d16f-4d6d-8f00-6b7e97c51030', '30fbbf23-af05-4dee-9ecc-71f6fd21cdec', 'I) Alumínios e suas ligas.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb70d288-57cf-4713-a65b-e77c80fd2244', '30fbbf23-af05-4dee-9ecc-71f6fd21cdec', 'J) Metais ferrosos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('18a8f985-57a5-499f-af0c-bab3a26b57cc', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 11', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d702c85a-3360-4460-b6d4-88f0f3f8e33a', '68dbf375-9362-439a-a5b3-155e4b69feb7', '18a8f985-57a5-499f-af0c-bab3a26b57cc', 'multiple_choice', 'A classificação AISI, própria para um determinado tipo de aço, é composta por 3 (três) dígitos. Das alternativas apresentadas a seguir, identifique aquela que identifica o primeiro dígito. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3a8e27c1-f7ca-419c-b535-2a6fd9f8e39d', 'd702c85a-3360-4460-b6d4-88f0f3f8e33a', 'A) Se o produto é uma chapa ou um tubo', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d238aff-1ca4-4d4d-b877-fe132e2cdbfd', 'd702c85a-3360-4460-b6d4-88f0f3f8e33a', 'B) Grau de soldabilidade do metal.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b36200e2-8c66-410a-b045-1482c6883bc7', 'd702c85a-3360-4460-b6d4-88f0f3f8e33a', 'C) Teores de Cr e Ni.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3f44a94-e553-437a-aec2-b1a36c164efe', 'd702c85a-3360-4460-b6d4-88f0f3f8e33a', 'D) Microestrutura típica do aço.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f1484029-d89b-447a-8e06-1091b0ce6687', 'd702c85a-3360-4460-b6d4-88f0f3f8e33a', 'E) Se o tubo é do tipo “com costura” ou “sem costura”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('22e09685-7a3a-4974-98c1-bf94afab9d0b', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 12', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', '68dbf375-9362-439a-a5b3-155e4b69feb7', '22e09685-7a3a-4974-98c1-bf94afab9d0b', 'multiple_choice', 'Qual das alternativas apresentadas a seguir melhor define “Classificação AISI”? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5855f1db-ed76-4758-b6cc-04188059e7fb', '321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', 'A) Ela classifica os metais em função de sua composição química.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5319fd2f-3629-4736-b976-066472772796', '321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', 'B) Estabelece os tipos de análises que devem ser realizados no momento que os metais de base são recebidos na fábrica.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c3bdf3d9-fa9a-4798-90a3-405bc55156e1', '321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', 'C) Agrupa os metais de base de acordo com as suas propriedades mecânicas e químicas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b48a9749-1f26-447e-a4ac-60a7bc648505', '321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', 'D) Determina os critérios de aceitação dos materiais, de acordo com a forma dos produtos.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1789fbeb-4925-4a08-b77d-ace5f42136a4', '321806e5-9fd3-4fbe-bc9d-537c6bd5ec3b', 'E) Agrupa as ligas de Al e Ni baseada em suas propriedades mecânicas.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3d41e08c-35ba-4435-80c1-08a143ac0db7', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 13', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('54b811f7-1b33-4a6c-99cb-f4f4778999ee', '68dbf375-9362-439a-a5b3-155e4b69feb7', '3d41e08c-35ba-4435-80c1-08a143ac0db7', 'multiple_choice', 'Quanto ao estudo dos metais de base, sabe-se que o volume da ASTM de identificação 00.01 é um índice geral. Em relação a este volume, identifique a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a2bfb35-3d26-46c2-ae21-2791aa9e3afd', '54b811f7-1b33-4a6c-99cb-f4f4778999ee', 'A) Listagem identificando todos os volumes das normas ASTM.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c6dda3eb-d6d3-440f-8677-d3aeb2979008', '54b811f7-1b33-4a6c-99cb-f4f4778999ee', 'B) Índice remissivo de todos os assuntos incluídos nos volumes.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d054d3e-2d7e-4168-8c3a-1f29c148768a', '54b811f7-1b33-4a6c-99cb-f4f4778999ee', 'C) Listagem alfa-numérica das normas incluída nos volumes.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0406cfa9-ea2e-4d58-9303-a3cbfa980e26', '54b811f7-1b33-4a6c-99cb-f4f4778999ee', 'D) As alternativas (a) e (b) estão corretas.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('00a6d458-5671-46be-a446-d6dcbf99a958', '54b811f7-1b33-4a6c-99cb-f4f4778999ee', 'E) As alternativas (a), (b) e (c) estão corretas.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0c81a2e8-6684-4ab8-8dae-c6c4ebf416fd', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 14', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('868d6bd2-39bd-44af-9924-16ec663ead76', '68dbf375-9362-439a-a5b3-155e4b69feb7', '0c81a2e8-6684-4ab8-8dae-c6c4ebf416fd', 'multiple_choice', 'Quanto à classificação AISI 310S, identifique a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48f49790-cdc8-4af8-9b1d-192ac619f858', '868d6bd2-39bd-44af-9924-16ec663ead76', 'A) Apresenta em sua composição química 0,310%C.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('87fa83ba-ac99-433b-9ddf-334f0a60f2ee', '868d6bd2-39bd-44af-9924-16ec663ead76', 'B) Apresenta em sua composição química 0,310%S.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30d85d5d-f2e2-4981-ae07-8cf0174773cf', '868d6bd2-39bd-44af-9924-16ec663ead76', 'C) Apresenta em sua composição química 3,10%Cr.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('863643d6-a0cb-40a1-8bf2-6f3cfaf64333', '868d6bd2-39bd-44af-9924-16ec663ead76', 'D) Apresenta microestrutura austenítica.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('84bb2e0d-0bf8-43ba-acc8-ff49733eccb8', '868d6bd2-39bd-44af-9924-16ec663ead76', 'E) Apresenta em sua composição química 3,10%Ni.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('53db9193-0dda-4a7f-b176-62bcf999f8f9', '68dbf375-9362-439a-a5b3-155e4b69feb7', 'activity', 'Questão 15', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3f81a301-0985-4550-9b57-784fa3a83665', '68dbf375-9362-439a-a5b3-155e4b69feb7', '53db9193-0dda-4a7f-b176-62bcf999f8f9', 'multiple_choice', 'Em relação às letras empregadas em algumas classificações AISI, identifique a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9d1570b1-3315-49e4-b7ba-dc7e1d377c77', '3f81a301-0985-4550-9b57-784fa3a83665', 'A) A letra “L” significa que o material apresenta baixo teor de C.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b087086a-a998-4d7a-b309-21e235cbeb55', '3f81a301-0985-4550-9b57-784fa3a83665', 'B) A letra “H” significa que o material apresenta alto teor de C.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b31a327-7dbb-460c-8d3c-5ac0e18fded7', '3f81a301-0985-4550-9b57-784fa3a83665', 'C) A letra “M” significa que o material apresenta baixo teor de Manganês.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63b310e1-f171-480f-8c6a-fb478e245d93', '3f81a301-0985-4550-9b57-784fa3a83665', 'D) A letra “N” significa que o material apresenta um certo teor de Nitrogênio', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d7e18f5a-8e04-46c6-82a2-99d35baa050f', '3f81a301-0985-4550-9b57-784fa3a83665', 'E) As letras “Se” significam que o material apresenta um determinado teor de Selênio.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('a1f6c649-67f3-46ed-809b-fcead7dded4e', 'c5555555-5555-5555-5555-555555555555', 'Ensaios Mecânicos', 'Questões e atividades sobre Ensaios Mecânicos', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'a1f6c649-67f3-46ed-809b-fcead7dded4e', 'Prática - Ensaios Mecânicos', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('89d00d78-f635-4dbd-9e11-209219e1b294', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3fe0528d-3903-4f05-9f63-850b57157e26', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '89d00d78-f635-4dbd-9e11-209219e1b294', 'multiple_choice', 'Quanto à importância da realização de ensaios mecânicos em materiais metálicos, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4fc5bc49-b84e-4722-a922-0bbd6116f79e', '3fe0528d-3903-4f05-9f63-850b57157e26', 'F) A determinação das propriedades mecânicas é geralmente obtida através de ensaios mecânicos, químicos e metalográficos de corpos de prova.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('054c3df1-ea68-4757-836d-9d88cd07b7d6', '3fe0528d-3903-4f05-9f63-850b57157e26', 'G) Os resultados dos ensaios mecânicos de um determinado material metálico servem como referência para futuras qualificações (homologações) de metais de adição, de procedimentos de soldagem, entre outras qualificações.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e52a9564-60ca-4619-aed0-bc846c7a36d7', '3fe0528d-3903-4f05-9f63-850b57157e26', 'H) Os ensaios mecânicos são considerados como ensaios destrutivos, pois, na grande maioria das vezes, provocam a quebra ou inutilizam a peça ensaiada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f070a8da-f398-48b9-b4da-8702bd8e9e0b', '3fe0528d-3903-4f05-9f63-850b57157e26', 'I) Os tipos de corpos de prova, suas dimensões e formas, procedimentos de ensaios são estabelecidos por normas técnicas aplicáveis, podendo ser brasileiras ou estrangeiras.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed492703-d742-4af6-8d79-415f6583d08b', '3fe0528d-3903-4f05-9f63-850b57157e26', 'J) Uma junta soldada localizada entre dois componentes de um equipamento deve ter suas propriedades mecânicas compatíveis com as propriedades mecânicas do metal de base.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4044fcaa-c7e7-4e57-b3a8-9a50c2e71bbf', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 3', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5f22adaf-176b-4d30-b372-172dd200228b', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '4044fcaa-c7e7-4e57-b3a8-9a50c2e71bbf', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não é um objetivo de um ensaio metalográfico? . ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('757ebd8d-c2c9-4b08-9c98-c98e1b568f9d', '5f22adaf-176b-4d30-b372-172dd200228b', 'A) Determinar as diferentes zonas da junta soldada, como também poder levantar o número de passes depositados no interior do chanfro, se foi realizada goivagem, observar a forma original do chanfro, etc.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e11c336-a55d-4f45-910d-430a65066b01', '5f22adaf-176b-4d30-b372-172dd200228b', 'B) Verificar se o metal em análise, durante o processo de fabricação, foi laminado, fundido ou forjado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('909d5c4f-c3cd-4e61-abe3-9b394b5d2a8d', '5f22adaf-176b-4d30-b372-172dd200228b', 'C) Determinar o tipo de material que está sendo ensaiado.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('29ec5ca0-b694-45d5-aec4-d486d40a56af', '5f22adaf-176b-4d30-b372-172dd200228b', 'D) Verificar se a junta soldada é formada por componentes de mesmo material ou se a mesma é uma junta dissimilar.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d540827f-8ade-4f5b-b9d9-f555569315e6', '5f22adaf-176b-4d30-b372-172dd200228b', 'E) Constatar a presença de descontinuidades, tais como: segregações e porosidades..', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9e2efda5-68d2-42ae-88b3-78fa054fddd7', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 4', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '9e2efda5-68d2-42ae-88b3-78fa054fddd7', 'multiple_choice', 'Como pode ser definido o termo “Macrografia”? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('393e9e10-6c58-4aba-b491-b1c8b0f5f158', 'f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'A) Técnica que permite observar, através de lentes especiais, uma superfície de um corpo de prova ou de uma peça, encontrando-se esta devidamente lixada, sendo posteriormente atacada pela aplicação de um reativo apropriado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('52611375-86c3-4224-9d29-04c16097ebae', 'f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'B) Técnica que permite observar uma superfície plana de um corpo de prova ou de uma peça, superfície esta que não precisa ser preparada para o ensaio. Basta a aplicação de um reativo apropriado na região de interesse para a realização completa do ensaio.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9bc96739-bbd8-41ec-91ba-b5333b387e8a', 'f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'C) Técnica simples que permite observar a superfície de um corpo de prova ou de uma peça, bastando apenas fazer o uso de lixas d`água na região de interesse.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f008971d-f6ca-4141-86c4-e8470214f3c6', 'f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'D) Técnica simples que permite observar a superfície de um corpo de prova ou de uma peça, bastando apenas aplicar, sobre a região de interesse, um reativo apropriado durante um período de tempo.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('278f3f94-4e80-4312-927e-04c8d47ca27e', 'f27f300b-7c69-4dad-99d0-4fe370cc37c4', 'E) Técnica que permite observar uma superfície plana de um corpo de prova ou de uma peça, encontrando-se esta devidamente lixada, sendo posteriormente atacada pela aplicação de um reativo apropriado.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8a034435-a0f2-490a-9fc8-2e09a681fb93', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 1', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9ba88953-693d-40fb-a16f-e96612a9f0d5', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '8a034435-a0f2-490a-9fc8-2e09a681fb93', 'multiple_choice', '8 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('75c1d77a-0cad-4c5b-888a-efb098188560', '9ba88953-693d-40fb-a16f-e96612a9f0d5', 'A) Mordedura', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bc0afdee-8a1f-48cc-8437-003b55a7290e', '9ba88953-693d-40fb-a16f-e96612a9f0d5', 'B) Trinca', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c0c5893-df04-4178-9513-288c450550f1', '9ba88953-693d-40fb-a16f-e96612a9f0d5', 'C) Poro', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ca73008e-2c17-4346-8641-37087327f00d', '9ba88953-693d-40fb-a16f-e96612a9f0d5', 'D) Inclusão de escória', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3df73c41-4a60-4bfb-bb78-48ca4549c39f', '9ba88953-693d-40fb-a16f-e96612a9f0d5', 'E) Falta de penetração', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cfab035e-1dff-45dd-80ca-1e42a54cd560', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 6', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a8fa3ea6-277a-419d-9361-b95897f757f1', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'cfab035e-1dff-45dd-80ca-1e42a54cd560', 'multiple_choice', 'Dos diferentes tipos de reativos (ou soluções de ataque), que podem ser empregados em um ensaio macrográfico de um corpo de prova feito de aço carbono (doce), assinale a alternativa correta. Desejando realizar um ensaio macrográfico em um corpo de prova feito de aço carbono (do tipo “doce”), pergunta-se: qual o reativo (ou solução de ataque) mais utilizado? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b96d4b1a-e587-4165-a18e-42a5b5b005d7', 'a8fa3ea6-277a-419d-9361-b95897f757f1', 'A) Reativo de ácido muriático.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c09e141a-f471-483c-9c28-a4c77a40cbd3', 'a8fa3ea6-277a-419d-9361-b95897f757f1', 'B) Reativo de iodo.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b5c43f71-89c1-4814-9df5-8c6ee2207c23', 'a8fa3ea6-277a-419d-9361-b95897f757f1', 'C) Reativo de persulfato de amônio.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83159ca6-4ea4-491a-b9bf-477dfb329995', 'a8fa3ea6-277a-419d-9361-b95897f757f1', 'D) Reativo de ácido nítrico (nital).', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('31719918-b8b6-46b0-9174-4319a56d6bc4', 'a8fa3ea6-277a-419d-9361-b95897f757f1', 'E) Reativo de ácido clorídrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8a9a4ee8-ef1a-42b3-921c-3163b5d6a356', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 7', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9e01d645-178f-474b-9c8b-5a9ae80217d9', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '8a9a4ee8-ef1a-42b3-921c-3163b5d6a356', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não faz parte da técnica de preparo de um corpo de prova para um ensaio macrográfico? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('da00a3d5-e29b-47e0-aee8-b2107d929ac2', '9e01d645-178f-474b-9c8b-5a9ae80217d9', 'A) Atacar a superfície, após lixamento completo, com um reativo químico apropriado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1ddb9fb6-e63d-45d7-8b92-46d89a7668af', '9e01d645-178f-474b-9c8b-5a9ae80217d9', 'B) Polir a superfície, após lixamento completo, utilizando uma pasta de diamante específica.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d00598be-2b75-4e4b-be10-6573bed41121', '9e01d645-178f-474b-9c8b-5a9ae80217d9', 'C) Escolher e localizar a seção que será analisada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1028dde9-0e78-4be5-81ad-9b71a5b29437', '9e01d645-178f-474b-9c8b-5a9ae80217d9', 'D) Cortar e lixar a região a ser analisada, antes da aplicação do reativo.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a1ed32de-65ce-45a2-995d-53bc528c0987', '9e01d645-178f-474b-9c8b-5a9ae80217d9', 'E) Lavar e secar a região, após ser corretamente lixada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a5190bc0-ba8f-4b6b-a9bb-30aa5a62a19e', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 1', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('92f98b85-2f11-4ff5-b2d3-db37fc84a899', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'a5190bc0-ba8f-4b6b-a9bb-30aa5a62a19e', 'multiple_choice', '9 ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('384066bb-55d1-47bd-8d20-983f3dea4652', '92f98b85-2f11-4ff5-b2d3-db37fc84a899', 'C) A esfera de aço, usada para produzir a impressão na região ensaiada, tem um diâmetro igual a 10,0 mm.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('53ed7305-3642-4551-b6f5-500e9d9a95c9', '92f98b85-2f11-4ff5-b2d3-db37fc84a899', 'D) Encontram-se no mercado dois tipos de durômetros portáteis que trabalham com a escala Brinell: o “Poldi” e o “Telebrineller”.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a27acbea-3e33-4fc9-b771-42fb9044c09e', '92f98b85-2f11-4ff5-b2d3-db37fc84a899', 'E) Recomenda-se que o diâmetro das impressões produzidas pelo medidor não seja superior a 9,0 mm.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cd1eef3c-17a6-4944-87ec-7916c25172a1', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 9', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('98a52be8-b9a3-4d36-beea-9141e8f0647c', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'cd1eef3c-17a6-4944-87ec-7916c25172a1', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique aquela que não é importante para o cálculo da dureza de uma superfície metálica, empregando um durômetro portátil do tipo “Brinell”. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('261c3a9b-6247-4523-8ab5-18d571be1762', '98a52be8-b9a3-4d36-beea-9141e8f0647c', 'A) Diâmetro da impressão da barra padrão.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b7fd2373-e1ab-4db7-9baa-441127769af0', '98a52be8-b9a3-4d36-beea-9141e8f0647c', 'B) Diâmetro do material testado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b8b2145-e47e-43ff-bcf0-2fefeffd50f6', '98a52be8-b9a3-4d36-beea-9141e8f0647c', 'C) Dureza da esfera.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('059f7081-9bb3-4eb3-8726-bffb55d87e28', '98a52be8-b9a3-4d36-beea-9141e8f0647c', 'D) Dureza da barra padrão.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1812113a-6012-42e6-ad38-cd4b61356bbb', '98a52be8-b9a3-4d36-beea-9141e8f0647c', 'E) Dureza do material testado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8156ecbb-c91c-4f3c-9cbc-568dd497b92c', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 10', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2206e929-b296-46a2-9949-e4298cc01ecb', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '8156ecbb-c91c-4f3c-9cbc-568dd497b92c', 'multiple_choice', 'Quanto aos durômetros portáteis que fazem medições pelo método Rockwell C, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e065a76-0ac2-4a77-b503-0d211ad1efd5', '2206e929-b296-46a2-9949-e4298cc01ecb', 'A) Técnica muita usada na indústria, visto ser totalmente desnecessário fazer uma limpeza na superfície que será ensaiada.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9632b827-f26e-490c-9f9d-11642ba8fa68', '2206e929-b296-46a2-9949-e4298cc01ecb', 'B) Uma vantagem do aparelho é que este permite utilizar mostradores com escalas de dureza Brinell ou Vickers, em lugar da escala Rockwell C.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('41bd044f-ab06-46b0-9acd-ae46f57f1d6e', '2206e929-b296-46a2-9949-e4298cc01ecb', 'C) Técnica que se baseia no princípio da medição da profundidade da impressão', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('00dfa337-6bb3-483e-ba59-98940eb475f4', '2206e929-b296-46a2-9949-e4298cc01ecb', 'D) Técnica utilizada para medir dureza da zona termicamente afetada de uma junta soldada, devido à pequena impressão produzida pelo aparelho.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d9bb057-9133-4238-8389-fcddf008a685', '2206e929-b296-46a2-9949-e4298cc01ecb', 'E) Os componentes do aparelho que ficam em contato com a peça devem estar bastante limpos, assim como a superfície que será analisada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2c989974-7a46-4bb4-87ba-3229eca3907a', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 1', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', '2c989974-7a46-4bb4-87ba-3229eca3907a', 'multiple_choice', '0 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6da8b6b8-778d-4cc5-8e5b-68e72f73a16e', 'c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'A) Mesmo embora os 3 tipos de métodos trabalhem com escalas de dureza diferentes, existem tabelas que possibilitam a conversão dessas escalas, o que permite a comparação dos valores medidos por qualquer método.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63df2ea4-3144-4ac8-945f-fc5c34a69395', 'c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'B) A possibilidade de conversão das várias escalas de dureza, apesar de ter uma grande utilidade prática, isto não permite que se possa confiar plenamente nos valores de dureza obtidos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('742feb03-eaf6-49cf-922b-2008385e4f78', 'c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'C) Com os valores de dureza obtidos usando os durômetros portáteis (especificamente para as escalas Brinell e Rockwell) é possível obter um valor aproximado do limite de resistência para alguns tipos de metais, como o aço carbono, por exemplo.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18de59f7-3dca-4362-b9f7-310909233111', 'c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'D) Apesar de existirem hoje diferentes métodos que permitem a obtenção de dureza empregando durômetros portáteis, ainda não existe uma norma técnica que estabeleça padrões e critérios que torne esta técnica confiável.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7828b2f4-ec1b-4c08-8b3e-b3dde9bce8d9', 'c476263e-a500-4cf0-bc71-1b3cd7d342c3', 'E) Quanto a juntas soldadas, alguns tipos de durômetros portáteis permitem medir durezas da face das soldas, assim como das zonas termicamente afetadas, dependendo do método empregado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b449b70f-c73d-4b4f-9417-71aafd2dfd1f', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'activity', 'Questão 12', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('de32f084-48a0-479e-87b7-6d96870de6bb', 'f315fbeb-2620-4dbe-95d3-2ec1d8395da1', 'b449b70f-c73d-4b4f-9417-71aafd2dfd1f', 'multiple_choice', 'Em que se baseia a técnica de medição de dureza Brinell, quando do uso de um durômetro portátil? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef7bec00-0ee6-4c58-9ff1-f351669cfed8', 'de32f084-48a0-479e-87b7-6d96870de6bb', 'A) Na comparação dos diâmetros das impressões.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b42456d2-8e75-4d1c-926d-ef22dafdb4ad', 'de32f084-48a0-479e-87b7-6d96870de6bb', 'B) Na medição da reação provocada no penetrador após o alívio da pré- carga.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f6c6bf6d-5b6e-4dea-a834-28b57a1bf94f', 'de32f084-48a0-479e-87b7-6d96870de6bb', 'C) Na comparação das diagonais das impressões.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f1e9385-f738-4b18-9c2b-03c0d30f48b3', 'de32f084-48a0-479e-87b7-6d96870de6bb', 'D) Na medição da profundidade das impressões.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e4a7837-cff9-40bb-a630-e82b1b21a6d5', 'de32f084-48a0-479e-87b7-6d96870de6bb', 'E) Na medição apenas dos diâmetros das impressões.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('165bddd6-38c4-489b-b996-e1684632120a', 'c5555555-5555-5555-5555-555555555555', 'Controle de Deformações', 'Questões e atividades sobre Controle de Deformações', 6, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '165bddd6-38c4-489b-b996-e1684632120a', 'Prática - Controle de Deformações', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('927cb333-cd4f-4c27-bb6d-ac1b4fb4c5ec', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('fbf31b6e-bc55-4bf3-b257-737a1e96c62e', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '927cb333-cd4f-4c27-bb6d-ac1b4fb4c5ec', 'multiple_choice', 'Abordando o tema “Deformação na Soldagem”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('28b6cf8f-ba33-4786-a82f-13198ddb3a30', 'fbf31b6e-bc55-4bf3-b257-737a1e96c62e', 'P) Quando um material metálico encontra-se posicionado livremente (sem restrições), sua estrutura expande-se em todas as direções quando é aquecida.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c6f2dfb5-cea4-47e7-bf24-540dd042115a', 'fbf31b6e-bc55-4bf3-b257-737a1e96c62e', 'Q) Um material metálico posicionado livremente, encontrando-se já aquecido e dilatado uniformemente, retorna às suas dimensões originais à proporção que o calor em seu corpo é dissipado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7cc01291-ea19-4832-be75-128f5d26d8f5', 'fbf31b6e-bc55-4bf3-b257-737a1e96c62e', 'R) Na soldagem de um metal, o volume da poça de fusão (metal de solda no estado líquido) é maior do que o volume do metal de solda solidificado.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('85785286-4bf9-4dc5-81d7-6cd5a6e0420d', 'fbf31b6e-bc55-4bf3-b257-737a1e96c62e', 'S) Para corrigir a deformação de um material metálico, basta aquecê-lo, uniformemente, a uma temperatura acima da zona crítica e resfriá-lo livremente ao ar.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4450d7a5-bd1d-41dc-a9c1-74e500e929f5', 'fbf31b6e-bc55-4bf3-b257-737a1e96c62e', 'T) Quando um material metálico é aquecido, tendo uma de suas laterais restringida, a expansão, provocada pela dilatação, não poderá ocorrer, porém o volume deste material não será impedido de aumentar.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bb445395-6712-42c3-981a-7840596ac32a', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8d21f3df-f04f-428f-bc7b-1d18fc1f539c', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'bb445395-6712-42c3-981a-7840596ac32a', 'multiple_choice', 'Analisando as propriedades físicas e mecânicas de um aço carbono em função da temperatura, assinalar a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5814de65-0b22-42ac-bb29-6b0a5f5b70b5', '8d21f3df-f04f-428f-bc7b-1d18fc1f539c', 'A) O coeficiente de dilatação térmica do aço diminui, quando a temperatura aumenta.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a9f4b7f-cd5f-4255-9b94-8d97483527cf', '8d21f3df-f04f-428f-bc7b-1d18fc1f539c', 'B) O limite de escoamento do aço diminui, quando a temperatura aumenta.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2355500-fa49-4546-8e1c-a34ae85bdaf7', '8d21f3df-f04f-428f-bc7b-1d18fc1f539c', 'C) A dureza do aço diminui, quando a temperatura aumenta.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b0b3e5e-18ed-4e2b-9f58-a984135d769e', '8d21f3df-f04f-428f-bc7b-1d18fc1f539c', 'D) O módulo de elasticidade do aço diminui, quando a temperatura diminui.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2060599-626f-4cda-9cc1-d002ab949e47', '8d21f3df-f04f-428f-bc7b-1d18fc1f539c', 'E) A tenacidade do aço diminui, quando a temperatura diminui.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e69bf1b2-c61a-4bfa-a006-0a21fcfc280d', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'e69bf1b2-c61a-4bfa-a006-0a21fcfc280d', 'multiple_choice', 'Das alternativas apresentadas a seguir, assinale aquela que não é um fator que influencia na deformação de uma junta soldada. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d9f5d1f6-9abf-45f8-8c44-fc5cd9dff45d', '2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', 'A) Propriedades físicas e mecânicas do material.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('042f1b6b-528a-48ef-967c-ccb5dc9e894f', '2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', 'B) Grau de restrição da junta.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c88294b-d298-41f9-ac24-32a77f6a2434', '2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', 'C) Tensões internas encontradas na junta', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d7ad9e15-047d-4116-b570-caa7386413cc', '2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', 'D) Energia de soldagem introduzida na junta durante a soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bea01b1c-7bbf-4529-a89c-bcfcda691370', '2bcf6eee-84ad-4db7-a3f2-dddca26a1c54', 'E) Aplicação de pré-aquecimento e pós-aquecimento na junta.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7cc4242f-f08a-43af-a455-c0173c93e696', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1e745aac-c018-4882-8141-3e74f5ff6698', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '7cc4242f-f08a-43af-a455-c0173c93e696', 'multiple_choice', 'Analisando as propriedades físicas e mecânicas do metal de solda (feito de aço carbono) em função da temperatura, assinalar a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d830c25b-9ea8-4c9d-9be7-0dd77b8f430f', '1e745aac-c018-4882-8141-3e74f5ff6698', 'A) A condutividade térmica do metal de solda diminui, quando a temperatura diminui.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67fc5416-1f34-442a-9213-7c25b3ab69d7', '1e745aac-c018-4882-8141-3e74f5ff6698', 'B) A dutilidade do metal de solda aumenta, quando a temperatura aumenta.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c3b2e81-3276-4dac-82cb-73342876c714', '1e745aac-c018-4882-8141-3e74f5ff6698', 'C) O limite de resistência da junta diminui, quando a temperatura aumenta.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6d42d3d9-7e82-4e00-9558-0bb2d1a48f5e', '1e745aac-c018-4882-8141-3e74f5ff6698', 'D) A tenacidade do metal de solda diminui, quando a temperatura diminui.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('453580f4-a49b-4b6b-96dc-3c80fdf1185c', '1e745aac-c018-4882-8141-3e74f5ff6698', 'E) A resistência mecânica do metal de solda aumenta, quando a temperatura diminui.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c7735b3d-c8f4-49d7-a325-c3a199a4aeba', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('53fcab86-9f11-4269-8a57-04571433c169', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'c7735b3d-c8f4-49d7-a325-c3a199a4aeba', 'multiple_choice', 'Analisando a energia de soldagem introduzida em uma junta durante a soldagem, assinale a alternativa correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bad2ee98-891a-40a3-b7a4-415f2a394a44', '53fcab86-9f11-4269-8a57-04571433c169', 'A) A energia de soldagem introduzida na junta não provoca qualquer tipo de deformação na região que está sendo soldada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c316f73b-6a90-467d-a20e-45f7f32976b3', '53fcab86-9f11-4269-8a57-04571433c169', 'B) Na soldagem de uma junta de ângulo, quanto maior a energia de soldagem, menor será a quantidade de metal de base adjacente à solda afetada por esta energia.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b51412b-62c5-4145-b84b-76e71d3701c2', '53fcab86-9f11-4269-8a57-04571433c169', 'C) A energia de soldagem só irá produzir alguma deformação em uma junta, caso o soldador ou operador de soldagem não usar os valores corretos das variáveis de soldagem, conforme estabelecidos na Especificação de Procedimento de Soldagem aplicável.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('23ca363f-7ac6-4b3b-a71e-7023c6603e54', '53fcab86-9f11-4269-8a57-04571433c169', 'D) Quanto maior a energia de soldagem em uma junta durante a soldagem, maior será a deformação naquela região.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e642733f-34bf-4a90-8df4-4f9d1f18bdce', '53fcab86-9f11-4269-8a57-04571433c169', 'E) A única influência da energia de soldagem é propiciar uma menor ou maior penetração do cordão de solda.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f82aedc9-e64d-4b65-bfad-950b65a65bc3', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 7', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('74bcba37-361e-453b-9def-3219a67d0241', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'f82aedc9-e64d-4b65-bfad-950b65a65bc3', 'multiple_choice', 'Quanto à contração transversal que ocorre em uma junta após a soldagem, identifique a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69633a7e-776b-42d2-a6db-6c5c8a2ff89c', '74bcba37-361e-453b-9def-3219a67d0241', 'A) Aplicar a técnica de pré-aquecimento, empregar altas energias de soldagem, entre outros, isto faz diminuir a contração transversal do metal de solda.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8004a86-8f04-4d4e-a009-858e0ef47fa9', '74bcba37-361e-453b-9def-3219a67d0241', 'B) Quanto maior a seção transversal da zona fundida, maior o nível de contração transversal produzido.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5d6326cd-a450-44b9-9ee3-db3ff08fb99a', '74bcba37-361e-453b-9def-3219a67d0241', 'C) A contração transversal aumenta, quanto maior for o grau de restrição das peças.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa6b3e0b-d53d-41cd-9b28-e2deba46286c', '74bcba37-361e-453b-9def-3219a67d0241', 'D) Aplicar a técnica “martelamento da solda”, isto aumenta a contração transversal da zona fundida.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('35d0e7c8-2b4f-45b7-a2c3-8db18b688713', '74bcba37-361e-453b-9def-3219a67d0241', 'E) Metal de solda produzido por muitos cordões de solda, assim como goivagens feitas com grandes profundidades, ambos os casos não afetam o nível de contração transversal da junta soldada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c2e17d3e-b81a-42e3-8ad6-d5ed1491f5fc', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 8', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('72f31359-f91d-4072-9d28-db16858ef2dc', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'c2e17d3e-b81a-42e3-8ad6-d5ed1491f5fc', 'multiple_choice', 'Das juntas apresentadas a seguir, qual dos chanfros gera a maior contração transversal? A B C D E \n\n<img src="/images/questions/page157_img1.png" width="100%" />\n\n<img src="/images/questions/page157_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8614c227-e1e0-4df6-844f-3b3b3204e926', '72f31359-f91d-4072-9d28-db16858ef2dc', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e919b6cb-27fa-4cc1-9ece-9cccd309c5d3', '72f31359-f91d-4072-9d28-db16858ef2dc', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('98682847-cb27-4c4d-b7fa-09eb95d98384', '72f31359-f91d-4072-9d28-db16858ef2dc', 'C) C', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2549cfe7-efdd-435e-b13a-68aab1779236', '72f31359-f91d-4072-9d28-db16858ef2dc', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('01d40d57-4894-4ab3-b945-64d5f1a3e612', '72f31359-f91d-4072-9d28-db16858ef2dc', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('352b6aa1-c1f9-4376-ad5c-94d63ce04888', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 9', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8900e707-e0e6-4675-9956-2691803b13a9', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '352b6aa1-c1f9-4376-ad5c-94d63ce04888', 'multiple_choice', 'Dos diferentes tipos de chanfro apresentados a seguir, identifique aquele que menos contribuirá para que ocorram deformações em uma junta soldada. A B C D E \n\n<img src="/images/questions/page158_img1.png" width="100%" />\n\n<img src="/images/questions/page158_img2.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0f01e237-088d-4b1d-8b09-abd121c3fce1', '8900e707-e0e6-4675-9956-2691803b13a9', 'A) A', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1903217d-b803-41af-9447-691a5f8847a6', '8900e707-e0e6-4675-9956-2691803b13a9', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ca76c8b-0dfe-483a-a8a0-f3e7e6fb7b1d', '8900e707-e0e6-4675-9956-2691803b13a9', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40f3f611-ad36-46b4-b254-8c0f9b6c85ea', '8900e707-e0e6-4675-9956-2691803b13a9', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a47b8da2-279d-4467-a307-eb1f7513f66f', '8900e707-e0e6-4675-9956-2691803b13a9', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a2f4f470-a25d-4202-8799-d634726e97e4', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('84fd54ca-cf62-449b-a957-408c192f9fcf', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'a2f4f470-a25d-4202-8799-d634726e97e4', 'multiple_choice', '9 \n\n<img src="/images/questions/page159_img1.png" width="100%" />\n\n<img src="/images/questions/page159_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d81fe615-9076-42b1-9861-037cacee1083', '84fd54ca-cf62-449b-a957-408c192f9fcf', 'D) Metal de solda produzido por muitos cordões de solda, assim como goivagens feitas com grandes profundidades, ambos os casos aumentam o nível de contração longitudinal da junta soldada.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7801376b-ba0e-4e27-97b2-641af0510418', '84fd54ca-cf62-449b-a957-408c192f9fcf', 'E) Aplicar a técnica “martelamento da solda” não interfere no nível da contração longitudinal produzida na junta soldada.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8176317d-5421-436d-af74-413b1beff6aa', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('550f8d96-3191-4475-b455-940c87f7e911', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '8176317d-5421-436d-af74-413b1beff6aa', 'multiple_choice', '0 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f85bcff4-6bb2-4123-94a6-9da1af19d4e5', '550f8d96-3191-4475-b455-940c87f7e911', 'D) D', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('593c52ef-37a5-4a79-bdda-8fa889afa89e', '550f8d96-3191-4475-b455-940c87f7e911', 'E) E', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ddb544ea-fc7a-46cd-9f88-5fe111f7adfb', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 12', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e7659972-fed3-4c0e-9f19-2108896d8cf8', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'ddb544ea-fc7a-46cd-9f88-5fe111f7adfb', 'multiple_choice', 'Das alternativas listadas a seguir, assinale aquela que não contribui para o controle de deformações de uma junta soldada. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e11fb95-ec2b-4562-84d7-aa67a055217f', 'e7659972-fed3-4c0e-9f19-2108896d8cf8', 'A) A contração transversal é desprezível em uma junta de ângulo.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f294a18d-b56f-4ee4-80a7-86ae08291f60', 'e7659972-fed3-4c0e-9f19-2108896d8cf8', 'B) A contração longitudinal depende da relação entre a seção transversal da zona fundida e a seção restante da peça.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6fc00036-1654-45b1-a281-0234448bc8cf', 'e7659972-fed3-4c0e-9f19-2108896d8cf8', 'C) As contrações longitudinal e transversal estão sujeitas aos mesmos fatores de influência.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5aa56b0b-9a47-44ec-a06a-9091bf8814c6', 'e7659972-fed3-4c0e-9f19-2108896d8cf8', 'D) A disposição irregular da zona plastificada em relação à linha neutra da peça é a principal razão da deformação angular.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('14ee9068-14b4-4e6d-b1d1-71d3537a0b25', 'e7659972-fed3-4c0e-9f19-2108896d8cf8', 'E) Durante a elaboração de um projeto, cordões de solda maiores devem ser localizados afastados da linha neutra.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7c3c570b-3e3c-4cd7-b77b-aa9e52078748', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 13', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('290d7911-9a4f-4792-be68-47c5d08bc165', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '7c3c570b-3e3c-4cd7-b77b-aa9e52078748', 'multiple_choice', 'A deformação conhecida como “Empenamento” é causada por qual tipo de contração? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8e57dcaf-67a8-480a-91c3-563eef3a872a', '290d7911-9a4f-4792-be68-47c5d08bc165', 'A) Contração Transversal.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c23e7fd2-19e0-432b-ae46-ff4bc2402944', '290d7911-9a4f-4792-be68-47c5d08bc165', 'B) Contração por Embicamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('16032f5c-29e3-4989-8f65-f0546ec1326b', '290d7911-9a4f-4792-be68-47c5d08bc165', 'C) Contração Longitudinal.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6bee181f-7b8b-420c-8f11-476d1993f4b0', '290d7911-9a4f-4792-be68-47c5d08bc165', 'D) Contração por Deformação Angular.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2954fd76-9960-436b-bf78-f8ecbf243b37', '290d7911-9a4f-4792-be68-47c5d08bc165', 'E) Contração por Desalinhamento.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9f19c6ee-2c53-4b45-9e32-98c93809bb13', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 14', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bf58cedf-8fab-4323-9e34-a464ff648514', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '9f19c6ee-2c53-4b45-9e32-98c93809bb13', 'multiple_choice', 'Quanto ao aparecimento de empenamentos em uma peça durante e após sua soldagem, identifique a alternativa que mostra o melhor método que isto seja evitado ou reduzido. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6d4d9078-f400-4f11-931d-d7c62380cdb7', 'bf58cedf-8fab-4323-9e34-a464ff648514', 'A) Adotar uma sequência de passes do tipo “passe à ré” ao longo da junta.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d3d16132-1d44-4537-a935-f4a7ca8a9523', 'bf58cedf-8fab-4323-9e34-a464ff648514', 'B) Aumentar o número de passes no interior do chanfro.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69f3e952-4cd7-4b8c-a22c-13752de66720', 'bf58cedf-8fab-4323-9e34-a464ff648514', 'C) Aplicar um pré-aquecimento na junta, objetivando diminuir as tensões residuais existentes.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('09266acc-367f-4f21-8bb5-6841e98bbaea', 'bf58cedf-8fab-4323-9e34-a464ff648514', 'D) Usar metais de solda com os menores diâmetros possíveis.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b4f5c994-d5a7-44b3-9df0-a82435bd3eb0', 'bf58cedf-8fab-4323-9e34-a464ff648514', 'E) No caso de empregar o processo de soldagem a arco submerso, usar fonte de energia que gere corrente contínua, estando o metal de adição ligado ao pólo positivo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('49277841-64ec-4d35-b611-654f4c03b693', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 15', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4d1bb548-d720-4192-9bd3-b83e7daaa7bb', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '49277841-64ec-4d35-b611-654f4c03b693', 'multiple_choice', 'Dos tipos de juntas apresentadas a seguir, identifique aquele que mais contribui para que haja grandes níveis de deformação. A B C D E \n\n<img src="/images/questions/page161_img1.png" width="100%" />\n\n<img src="/images/questions/page161_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4205337d-dfb0-455f-874c-f269aae6b263', '4d1bb548-d720-4192-9bd3-b83e7daaa7bb', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3bcb075a-92bc-4b09-8e7f-ff473a1119ac', '4d1bb548-d720-4192-9bd3-b83e7daaa7bb', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d613463-712a-4c47-a854-af5d8d796bd9', '4d1bb548-d720-4192-9bd3-b83e7daaa7bb', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cabbe962-526e-4f2d-94fa-a038b3e906fc', '4d1bb548-d720-4192-9bd3-b83e7daaa7bb', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d0b2cdf7-46b2-4df8-8f72-e599756bc0ae', '4d1bb548-d720-4192-9bd3-b83e7daaa7bb', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d43350e4-ef04-423a-bea9-3d5de30d607a', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 17', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f8862376-07f4-4809-a893-426152a7b75a', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'd43350e4-ef04-423a-bea9-3d5de30d607a', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique a única que pode evitar ou mesmo eliminar as deformações em uma junta durante e após a soldagem. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7747d507-5025-4f5f-897f-8a0fc31ce8d3', 'f8862376-07f4-4809-a893-426152a7b75a', 'A) Tentar soldar a junta o mais devagar possível. O objetivo desta técnica é fazer com que o escoamento do calor aconteça uniformemente, evitando o risco de produzir empenos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('63ce658e-7ead-45d3-bd09-ff6bb55acb5b', 'f8862376-07f4-4809-a893-426152a7b75a', 'B) Preferir soldas de ângulo contínuas ao invés de soldas de ângulo intermitentes.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd55545a-e2e0-429f-9522-ef48d3cdb61d', 'f8862376-07f4-4809-a893-426152a7b75a', 'C) Adotar chanfros simples ao invés de chanfros duplos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a23184f6-a9d4-4026-bea5-689bf09c839b', 'f8862376-07f4-4809-a893-426152a7b75a', 'D) Evitar o uso da técnica “Pré-deformação”, visto que isto pode aumentar ainda mais a deformação da junta.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f0d976c-cd7c-409f-a346-2b47da690531', 'f8862376-07f4-4809-a893-426152a7b75a', 'E) Ao ter que preencher um chanfro em V com muitos passes, distribuí-los de tal forma que se consiga espalhar o calor uniformemente pelos dois lados do chanfro.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9ff9cb44-3ea1-41b9-a146-1e6f8c46965f', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 18', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d509fcb1-d96a-4de6-80b5-998c1ef2cad5', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '9ff9cb44-3ea1-41b9-a146-1e6f8c46965f', 'multiple_choice', 'Dos exemplos apresentados a seguir, indique aquele que contribui para que sejam produzidas deformações durante a soldagem. A B C D E \n\n<img src="/images/questions/page163_img1.png" width="100%" />\n\n<img src="/images/questions/page163_img2.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fceba95e-c179-44e7-8298-8b8be3ba775b', 'd509fcb1-d96a-4de6-80b5-998c1ef2cad5', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a0378ab0-9d9a-4d69-9b0e-873b28e1821f', 'd509fcb1-d96a-4de6-80b5-998c1ef2cad5', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0cec00a-0489-4fc9-9786-360b1b36def9', 'd509fcb1-d96a-4de6-80b5-998c1ef2cad5', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('38f99efb-3d1c-4097-b502-df7f514b048e', 'd509fcb1-d96a-4de6-80b5-998c1ef2cad5', 'D) D', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('148946fc-ed40-4783-a55b-079dae1b8384', 'd509fcb1-d96a-4de6-80b5-998c1ef2cad5', 'E) E', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9e54c9e4-ed2d-4536-b64a-54edb7d01ab4', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d25b3f2d-86be-4a90-bdfd-986013bd31de', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '9e54c9e4-ed2d-4536-b64a-54edb7d01ab4', 'multiple_choice', '4 cordões mais próximos da linha neutra para evitar que ocorra uma deformação angular na região que está sendo soldada. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('79f24e6c-f35c-4ae6-be34-3acad3335821', 'd25b3f2d-86be-4a90-bdfd-986013bd31de', 'B) O empenamento é um tipo de problema que ocorre normalmente na soldagem de chapas finas e perfis leves.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67ff0578-31f8-47ad-9eeb-2f7c4a622cfe', 'd25b3f2d-86be-4a90-bdfd-986013bd31de', 'C) As contrações longitudinal e transversal estão sujeitas a fatores de influência completamente distintos.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ae11f035-7e41-4578-b203-dbe4ce6167ae', 'd25b3f2d-86be-4a90-bdfd-986013bd31de', 'D) As medidas de prevenção e controle de deformações na soldagem devem ser tomadas desde o projeto até a montagem final de uma estrutura.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6f294e9a-1dfb-4180-9a89-dd0449c907c1', 'd25b3f2d-86be-4a90-bdfd-986013bd31de', 'E) A fixação dos dispositivos auxiliares de montagem por meio da soldagem tem que ser considerada como definitiva. Por este motivo, esta soldagem deve ser feita de acordo com uma especificação de procedimento de soldagem (EPS) previamente aprovada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('80516d05-71f2-4f66-8c84-ac053d170624', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 20', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3954a97c-432d-47c0-9ce6-0c6299784cae', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '80516d05-71f2-4f66-8c84-ac053d170624', 'multiple_choice', 'Quanto à técnica conhecida como “Martelamento”, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d838b99-df5e-4c65-a95e-0f303c1345b5', '3954a97c-432d-47c0-9ce6-0c6299784cae', 'A) A técnica do Martelamento pode ser realizada em todos os passes produzidos em uma junta de topo, à exceção do passe de raiz. Nas demais regiões, ela pode ser feita sem qualquer restrição.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fa0731d-d8be-4952-b9a7-5beb16240663', '3954a97c-432d-47c0-9ce6-0c6299784cae', 'B) A técnica do Martelamento é uma maneira de se interagir com as forças de contração de um cordão de solda durante o seu resfriamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0196144c-de74-491e-94eb-aec0e7b2b964', '3954a97c-432d-47c0-9ce6-0c6299784cae', 'C) A técnica do Martelamento só pode ser aplicada, quando um procedimento específico tiver sido aprovado anteriormente.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('782af5e8-323b-4236-8760-6b2eed3afd7e', '3954a97c-432d-47c0-9ce6-0c6299784cae', 'D) Em uma junta de topo, dois são os locais onde a técnica de Martelamento não deve ser aplicada: no passe de raiz (nesse local esta técnica nunca pode ser usada) e nos passes de acabamento da solda. Nesses passes, há chances do martelamento encobrir trincas, assim como criar regiões encruadas.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be7d7aae-4834-4b44-a008-6e2f20400579', '3954a97c-432d-47c0-9ce6-0c6299784cae', 'E) A região do martelo que é usada nesta técnica é parte esférica da ferramenta (“bola”). A região cilíndrica do martelo não pode ser usada nesta técnica, haja vista que ela pode gerar entalhes na superfície da junta no momento do impacto.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2f01f98e-acf0-44c5-a64f-095ef5a5da89', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f96592e1-9514-4540-b435-86b8baa33e6e', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '2f01f98e-acf0-44c5-a64f-095ef5a5da89', 'multiple_choice', '5 \n\n<img src="/images/questions/page165_img1.png" width="100%" />\n\n<img src="/images/questions/page165_img2.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('abd66af8-70a7-4679-9e84-efc13cea4a2d', 'f96592e1-9514-4540-b435-86b8baa33e6e', 'D) Adoção de processos de soldagem automáticos (arco submerso, GMAW mecanizado, entre outros).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06baf479-237c-4353-9917-2b3f0c06e1d5', 'f96592e1-9514-4540-b435-86b8baa33e6e', 'E) Uso simultâneo de dois arames sólidos na mesma torcha (técnica conhecida como “twin arc”, arco gemo, em português).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0be8add5-4ca0-4346-8309-7ede2693ec78', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 23', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ee9b6f9c-0374-4515-a88f-74d1a17c4d72', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '0be8add5-4ca0-4346-8309-7ede2693ec78', 'multiple_choice', 'Quanto aos gabaritos e dispositivos auxiliares de fixação e montagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c345b80-b39d-4b8d-9365-5c761b2be0a7', 'ee9b6f9c-0374-4515-a88f-74d1a17c4d72', 'A) A solda usada para prender os dispositivos auxiliares de fixação e montagem na obra, além dos ponteamentos e de outras soldas provisórias devem ser realizadas com o mesmo rigor das soldas propriamente ditas, ou seja, devem ser encaradas como soldas definitivas.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83c06256-4795-4f7f-ba7d-6b0a5c6c9cda', 'ee9b6f9c-0374-4515-a88f-74d1a17c4d72', 'B) Os dispositivos auxiliares de fixação e montagem, quando permitidos pela norma de fabricação ou de construção do equipamento, devem atender aos requisitos específicos de materiais do equipamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('17dfe71e-0a41-4c9c-9a39-55ef90d6fbf4', 'ee9b6f9c-0374-4515-a88f-74d1a17c4d72', 'C) A função principal dos dispositivos auxiliares de fixação e montagem é fazer uma resistência às forças de contração/deformação localizadas na região da junta durante o resfriamento da solda.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('471b1177-b7f2-4b25-9e52-ff5e53bbe20c', 'ee9b6f9c-0374-4515-a88f-74d1a17c4d72', 'D) A retirada dos dispositivos auxiliares de fixação e montagem da obra não está vinculada a nenhuma norma ou documento técnico. Qualquer técnica usada, como por exemplo: uso de disco abrasivo, impacto, goivagem, entre outras, para a realização desta tarefa é passível de ser usada.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3eb2e6da-fae5-48ad-a4d1-4206b2865f56', 'ee9b6f9c-0374-4515-a88f-74d1a17c4d72', 'E) A solda usada para prender os dispositivos auxiliares de fixação e montagem na obra, os ponteamentos e as outras soldas provisórias devem ser realizadas de acordo com as informações encontradas em uma especificação de procedimento de soldagem própria.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('83e075c1-b83f-4ce0-a328-8230e200b7fd', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 1', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('19328026-ed2a-4a61-8e01-ee8f18ff0a1b', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '83e075c1-b83f-4ce0-a328-8230e200b7fd', 'multiple_choice', '7 ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4749eb36-c006-40b8-9a81-eb3d241afdf7', '19328026-ed2a-4a61-8e01-ee8f18ff0a1b', 'D) A técnica conhecida como “pré-deformação” ou “pré-tensionamento”, utilizadas em peças a serem soldadas, se valem do uso de forças mecânicas opostas para interagir com a deformação produzida pela soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bcc3ac3d-af8c-43a4-b154-b750ec60c8de', '19328026-ed2a-4a61-8e01-ee8f18ff0a1b', 'E) Tendo em vista que não há uma fórmula que informe qual o valor da pré- deformação a ser aplicada na junta antes da soldagem, é necessário que as primeiras soldas sejam cuidadosamente preparadas e acompanhadas, para que, a partir de seus resultados, se corrija (ou não) o ângulo de pré-deformação usado inicialmente.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('47569c77-dfb6-4ca0-8708-1f7075a0acef', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 25', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cc03bf34-9c32-4d4e-a7ad-d958ebee6336', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', '47569c77-dfb6-4ca0-8708-1f7075a0acef', 'multiple_choice', 'Na soldagem de uma junta de ângulo, formada por chapas de aço carbono com espessuras iguais a 50 mm, 2”, qual o principal tipo de deformação que irá ser produzido? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e5b0fe5-598a-4681-977e-3cb6a01c3247', 'cc03bf34-9c32-4d4e-a7ad-d958ebee6336', 'A) Embicamento.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d18869c1-8c37-411f-9a32-8a76164a7315', 'cc03bf34-9c32-4d4e-a7ad-d958ebee6336', 'B) Deformação angular.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cc5a1d46-30a6-4ae3-a5c4-c5cfa42fa31d', 'cc03bf34-9c32-4d4e-a7ad-d958ebee6336', 'C) Empenamento.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b14a4ae6-ebf3-4974-bccb-77691348d83d', 'cc03bf34-9c32-4d4e-a7ad-d958ebee6336', 'D) Contração transversal.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('16db60ed-81bd-4627-a5bc-e0442b898805', 'cc03bf34-9c32-4d4e-a7ad-d958ebee6336', 'E) Contração longitudinal', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b30d4960-c957-4608-b742-ee084dda3a3d', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 26', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('84ff058e-8a42-4c1a-a85a-3dedae34aa52', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'b30d4960-c957-4608-b742-ee084dda3a3d', 'multiple_choice', 'Das alternativas apresentadas a seguir, indique aquela que não é uma medida de prevenção para controle de deformação. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2b3777f0-daec-4d85-b7d8-a09421ef19e6', '84ff058e-8a42-4c1a-a85a-3dedae34aa52', 'A) Empregar chanfros do tipo “em V”, “em meio V” ou “em J”.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('43c5a34d-7fb5-4a31-af71-8417a8e2ec58', '84ff058e-8a42-4c1a-a85a-3dedae34aa52', 'B) Adotar o uso de soldas descontínuas sempre que possível.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e9f34b3d-ab4a-4a1e-acab-5acb4cf0364d', '84ff058e-8a42-4c1a-a85a-3dedae34aa52', 'C) Empregar sequências de soldagem que distribuam melhor o calor produzido durante a soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c5f7ea1-08b4-409d-8c9f-7e8b79e0d435', '84ff058e-8a42-4c1a-a85a-3dedae34aa52', 'D) Usar baixa energia de soldagem (aporte térmico).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('36d2f829-ce20-43b4-b260-8acef4462047', '84ff058e-8a42-4c1a-a85a-3dedae34aa52', 'E) Utilizar a técnica “disposição dorso a dorso”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e9f6a2e1-3c87-4005-9a54-61682fce2e69', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 28', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('74d40a80-d972-434e-8f90-ab68a3db3fbe', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'e9f6a2e1-3c87-4005-9a54-61682fce2e69', 'multiple_choice', 'Quanto à correção de deformações por intermédio da técnica conhecida como “aquecimento localizado”, identifique a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e7ac8c54-0f36-4519-bd65-0ae6a6e425cf', '74d40a80-d972-434e-8f90-ab68a3db3fbe', 'A) A única chama possível a ser usada para esta técnica é aquela formada pela reação entre os gases oxigênio e acetileno. Quaisquer outros gases estão proibidos de serem usados.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('993c5a86-52af-459c-82bb-12eb22fb22f2', '74d40a80-d972-434e-8f90-ab68a3db3fbe', 'B) Tendo em vista que a austenita é a microestrutura que mais solubiliza o hidrogênio em sua matriz, aconselha-se que a temperatura do local a ser trabalhado atinja valores em torno de 915ºC.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f9ba5278-672c-4cbb-9ccd-6969a0edd3a3', '74d40a80-d972-434e-8f90-ab68a3db3fbe', 'C) Em hipótese alguma é permitido o uso de água durante a aplicação do calor na região que está sendo trabalhada. Isto provocaria um resfriamento instantâneo na região resfriada, gerando martensitas e outras microestruturas indesejáveis.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('22ddbac8-3f65-4900-ace9-906452e6d209', '74d40a80-d972-434e-8f90-ab68a3db3fbe', 'D) Os melhores resultados obtidos com o uso desta técnica são: chapas finas –usar técnica “zona em forma de cunha”; chapas média e grossa – usar técnica “aquecimento em pontos”.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0ac4a7bb-be1d-40fe-b8e7-4cd38c5ab192', '74d40a80-d972-434e-8f90-ab68a3db3fbe', 'E) Aconselha-se a usar temperaturas da região a ser trabalhada na faixa entre 600 e 650ºC. Temperaturas mais elevadas podem provocar problemas metalúrgicos ao material.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a28d0e58-d89c-4951-8e25-4ccbe3c16e94', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 29', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'a28d0e58-d89c-4951-8e25-4ccbe3c16e94', 'multiple_choice', 'Das juntas apresentadas a seguir, qual dos chanfros gera a maior contração longitudinal? A B C D E \n\n<img src="/images/questions/page169_img1.png" width="100%" />\n\n<img src="/images/questions/page169_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f56bb4a8-a00c-4b48-8569-01b11b613bd5', 'a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', 'A) A', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b786dbd6-22d7-4e56-b93d-4603771f4c21', 'a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', 'B) B', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b1952926-b7e2-496a-8062-d04a86a77d46', 'a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', 'C) C', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1db5c071-c70c-49f7-b494-072e55e80dc3', 'a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', 'D) D', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2756b20d-91af-4432-b8b0-f139fc6e8bd6', 'a1ee0fcf-d547-4b2c-bdc5-0ce48d3281f7', 'E) E', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e4903f84-c165-4191-adcb-75b7192b9c7c', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'activity', 'Questão 30', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9c3eea38-cb3b-42fc-8ccf-539a69917faa', '2e7bbb44-c694-453a-8b68-e1ad5cbccde6', 'e4903f84-c165-4191-adcb-75b7192b9c7c', 'multiple_choice', 'No que diz respeito às técnicas para o controle de deformações na soldagem de componentes com espessuras superiores a 30 mm, identifique a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6145ffe1-1485-4786-9277-64834f2c2d9d', '9c3eea38-cb3b-42fc-8ccf-539a69917faa', 'A) Quando da soldagem de chapas de grandes espessuras, a melhor maneira de diminuir as deformações nas juntas soldadas é adotar o chanfro do tipo “V”.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81de0753-51bc-4935-8ac3-6aca506679de', '9c3eea38-cb3b-42fc-8ccf-539a69917faa', 'B) Em uma soldagem de junta de topo, quando é extremamente difícil a aplicação de vários cordões alternados nos dois lados da junta, deve-se adotar o chanfro assimétrico do tipo “em duplo V (1/2- 1/2)”.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d86bdb0f-9b90-4925-9ab0-4405ce117dd7', '9c3eea38-cb3b-42fc-8ccf-539a69917faa', 'C) Para se obter um melhor controle sobre a deformação em chanfros do tipo “em duplo V (1/3-2/3)”, soldar sempre por último o lado que tiver o maior volume de metal depositado; isto compensará a restrição imposta pela primeira solda (a de menor volume).', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('242bfb5f-c790-4f32-9c20-ff55e8adb069', '9c3eea38-cb3b-42fc-8ccf-539a69917faa', 'D) Para se obter um melhor controle sobre a deformação em chanfros do tipo “em duplo V (1/3-2/3)”, soldar sempre por último o lado que tiver o menor volume de metal depositado. Isto compensará a restrição imposta pela primeira solda (a de maior volume).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ea611eff-a501-4161-87c4-aef703cc1769', '9c3eea38-cb3b-42fc-8ccf-539a69917faa', 'E) Quando da soldagem de chapas de grandes espessuras, a melhor maneira de diminuir as deformações nas juntas soldadas é adotar o chanfro do tipo “em duplo V (1/2- 1/2)”, com cada lado sendo soldado de uma única vez (não alternando os lados).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('47cfcaa2-3ef0-46b0-aaae-13486f80a5e5', 'c5555555-5555-5555-5555-555555555555', 'Documentos Técnicos', 'Questões e atividades sobre Documentos Técnicos', 7, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('15cb32e2-fdf3-46fb-b1bb-719b1f406887', '47cfcaa2-3ef0-46b0-aaae-13486f80a5e5', 'Prática - Documentos Técnicos', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a79fa9df-2384-4112-8e8e-56f5398060c0', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('da84ed4b-f45b-431d-8da6-b5c42dd1cd36', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'a79fa9df-2384-4112-8e8e-56f5398060c0', 'multiple_choice', 'Na qualificação de um procedimento de soldagem, indique a alternativa que informa quais são os principais documentos envolvidos nesta atividade. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21bed2c6-488b-46f8-9edf-196710ed762d', 'da84ed4b-f45b-431d-8da6-b5c42dd1cd36', 'P) Registro de Qualificação de Procedimento de Soldagem e Registro da Qualificação de Soldadores e Operadores de Soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b3f6c50-704e-40ba-9eba-8751475a4ead', 'da84ed4b-f45b-431d-8da6-b5c42dd1cd36', 'Q) Especificação de Procedimento de Soldagem e Instruções de Execução e Inspeção de Soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4150b08a-2c27-4516-b3be-c11ca04444b6', 'da84ed4b-f45b-431d-8da6-b5c42dd1cd36', 'R) Especificação de Procedimento de Soldagem e Relação de Soldadores e Operadores de Soldagem Qualificados.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fc91ea6e-f7b7-4453-b579-f536cdf7946f', 'da84ed4b-f45b-431d-8da6-b5c42dd1cd36', 'S) Especificação de Procedimento de Soldagem e Registro de Qualificação de Procedimento de Soldagem e Controle de Desempenho de Soldadores e Operadores de Soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aa4f49c5-b5b8-4a47-861e-18d3bf7a1765', 'da84ed4b-f45b-431d-8da6-b5c42dd1cd36', 'T) Registro de Qualificação de Procedimento de Soldagem e Relatório de Inspeção de Produtos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bf3aff1c-e2c7-4d8a-9221-10d41580040d', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('dc2b3282-89a1-4ba3-97a5-6a12822a49fa', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'bf3aff1c-e2c7-4d8a-9221-10d41580040d', 'multiple_choice', 'No que diz respeito ao documento “Especificação de Procedimento de Soldagem” (EPS), identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f751581-4681-4775-85ba-adba1f6be429', 'dc2b3282-89a1-4ba3-97a5-6a12822a49fa', 'A) Documento, cuja validade está vinculada à fabricação de um determinado equipamento. Após o término deste, uma nova qualificação deve ser realizada.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ab88d600-394b-42ed-96f7-94508bec6484', 'dc2b3282-89a1-4ba3-97a5-6a12822a49fa', 'B) Documento preparado para fornecer aos soldadores e operadores de soldagem as diretrizes para a produção de soldas.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3ecfc85-21ee-4969-b412-ff7ef8ba70cf', 'dc2b3282-89a1-4ba3-97a5-6a12822a49fa', 'C) Documento que determina os limites para o conjunto de variáveis e condições de um procedimento de soldagem que devem ser seguidos na sua execução.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ba5fe6cf-6dee-479f-b653-5a2db76ef850', 'dc2b3282-89a1-4ba3-97a5-6a12822a49fa', 'D) Documento usado pelo Inspetor de Soldagem para o acompanhamento das qualificações e da soldagem de chapas de produção, objetivando verificar se os parâmetros e condições estabelecidas estão sendo cumpridas.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d4e20b0-5c07-4535-b556-d7d3ad841685', 'dc2b3282-89a1-4ba3-97a5-6a12822a49fa', 'E) Documento elaborado apenas pelo Inspetor de Soldagem Nível 2.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('596a5d18-39c0-499e-862c-d603c4a3564e', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 2', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2a23dce3-b106-4759-8ce1-a6887bb451e7', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '596a5d18-39c0-499e-862c-d603c4a3564e', 'multiple_choice', '3 ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3cf8b68d-ed44-468b-9852-24e776a097c8', '2a23dce3-b106-4759-8ce1-a6887bb451e7', 'D) Controle de Desempenho de Soldadores e Operadores de Soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3b3316f9-cb6c-4f72-91af-c04a8c38165a', '2a23dce3-b106-4759-8ce1-a6887bb451e7', 'E) Relação de Soldadores e Operadores de Soldagem Qualificados.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c1853630-7933-48ab-b07d-05bf5c550560', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('904b7dcb-f6cd-48c1-b353-5051abcfeba2', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'c1853630-7933-48ab-b07d-05bf5c550560', 'multiple_choice', 'Normalmente os valores das variáveis de soldagem são informados em uma Especificação de Procedimento de Soldagem na forma de “faixas”. Identifique qual parâmetro de soldagem, constado naquele documento, é informado na forma de “limite” (superior ou inferior). ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24ddbd8f-ea1f-41b9-bb3f-05171f7c25da', '904b7dcb-f6cd-48c1-b353-5051abcfeba2', 'A) Intensidade de corrente elétrica.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d408f929-5018-4971-bdc9-e62f798ed924', '904b7dcb-f6cd-48c1-b353-5051abcfeba2', 'B) Temperatura de pré-aquecimento.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b8b8e106-e6f6-4656-a66b-e2b6d2f8f787', '904b7dcb-f6cd-48c1-b353-5051abcfeba2', 'C) Velocidade de soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ad8b82aa-4fb8-46c0-ac7e-5dc67e6f58e7', '904b7dcb-f6cd-48c1-b353-5051abcfeba2', 'D) Tensão do arco.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88bb2f04-e3bb-4ef9-bd99-29f3e1839dc1', '904b7dcb-f6cd-48c1-b353-5051abcfeba2', 'E) Espessura da peça de teste.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f53a644f-bc13-4aff-9c37-a1828f828dfb', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0fd713ab-8914-4dae-a613-dff7ab04f705', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'f53a644f-bc13-4aff-9c37-a1828f828dfb', 'multiple_choice', 'Qual dos parâmetros de soldagem listado a seguir não é obrigatória a sua informação em uma Especificação de Procedimento de Soldagem? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('469810e4-84e6-4079-a827-03517db0750d', '0fd713ab-8914-4dae-a613-dff7ab04f705', 'A) Tipo de corrente.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b16e7721-ea12-4a64-9f39-39c6971f9848', '0fd713ab-8914-4dae-a613-dff7ab04f705', 'B) Uso da técnica do “martelamento”.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('837fb0a3-346b-4854-a89f-bd3bae57fd97', '0fd713ab-8914-4dae-a613-dff7ab04f705', 'C) Especificação do metal de base.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b31dc2cf-03e9-4a59-a940-711536509d49', '0fd713ab-8914-4dae-a613-dff7ab04f705', 'D) Método de goivagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('722defbd-3c95-442c-a803-62778c3d5a2f', '0fd713ab-8914-4dae-a613-dff7ab04f705', 'E) Ângulo de inclinação do eletrodo.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f2027ceb-a1a5-41d1-8d67-e5f61e285b9a', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 6', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0f2609d0-3537-4f3e-9582-c740ae787731', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'f2027ceb-a1a5-41d1-8d67-e5f61e285b9a', 'multiple_choice', 'No documento “Especificação de Procedimento de Soldagem” (EPS), existe um espaço destinado para informações sobre o gás de proteção (ou mistura) usado nos processos GMAW, GTAW, entre outros. Qual das alternativas apresentadas a seguir não é exigida que conste neste documento? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('51cfaaf3-4c08-4d76-a348-31f132a6c4c0', '0f2609d0-3537-4f3e-9582-c740ae787731', 'A) Gás (ou mistura) usada na proteção.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a99812a1-c748-45ac-a666-c0dff5a46f33', '0f2609d0-3537-4f3e-9582-c740ae787731', 'B) No caso do uso de uma mistura, informar a participação da quantidade de cada gás presente na mistura.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21ef41fe-7cbe-4a1d-9bc2-e90e87e305c1', '0f2609d0-3537-4f3e-9582-c740ae787731', 'C) Informar se o gás (ou mistura) são provenientes de cilindros ou tanques.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('588b2ec3-d696-4d97-8ce1-3990d0398090', '0f2609d0-3537-4f3e-9582-c740ae787731', 'D) Informar a faixa de vazão do gás (ou mistura).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c8964811-1a65-4891-8438-3294233883e6', '0f2609d0-3537-4f3e-9582-c740ae787731', 'E) Gás (ou mistura) usada na purga (quando esta for realmente empregada).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('657473a9-be15-4e4a-9b37-a4b6dcc6e0a5', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 7', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('59b55198-cb01-4309-898d-0c9d836f9be1', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '657473a9-be15-4e4a-9b37-a4b6dcc6e0a5', 'multiple_choice', 'No que diz respeito ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('968f80e7-27a9-4a74-b7e2-dfe262103e51', '59b55198-cb01-4309-898d-0c9d836f9be1', 'A) Documento onde são informados os registros de todos os parâmetros de soldagem e condições estabelecidos em uma EPS relativa a uma qualificação, assim como os resultados dos ensaios visual, destrutivos e não destrutivos realizados após a soldagem da peça de teste.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c76f839-6fc6-462a-b608-986c5027b913', '59b55198-cb01-4309-898d-0c9d836f9be1', 'B) As normas de qualificação permitem que vários RQPSs dêem suporte a uma EPS.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6aedbce7-8f64-49ed-8c1a-19617f7c27d6', '59b55198-cb01-4309-898d-0c9d836f9be1', 'C) As normas de qualificação permitem que diversas EPSs possam ser preparadas com base em um RQPS em função das variáveis essenciais.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e72a0f3-14ad-42dc-b39b-5f275fda79bd', '59b55198-cb01-4309-898d-0c9d836f9be1', 'D) Documento mais importante de uma qualificação de procedimento de soldagem.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1ac0d2b9-838e-4b35-8830-0cf33bb92b39', '59b55198-cb01-4309-898d-0c9d836f9be1', 'E) Uma EPS não tem qualquer valor se não estiver relacionada a pelo menos uma RQPS.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3258d17b-b61e-40e6-a542-31052bc302c0', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8618fad2-b492-409e-a7c5-059f708c437e', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '3258d17b-b61e-40e6-a542-31052bc302c0', 'multiple_choice', 'Em relação às informações que são encontradas em um “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e7e27101-ef75-41af-af72-2365f35b6c83', '8618fad2-b492-409e-a7c5-059f708c437e', 'A) Valor do limite de escoamento obtido no ensaio de tração.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8e72292e-3037-41a2-968b-9c35d3d2b070', '8618fad2-b492-409e-a7c5-059f708c437e', 'B) Registro da disposição dos passes no interior do chanfro.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06ec9c1e-8f64-4313-9333-b2d51baaac9b', '8618fad2-b492-409e-a7c5-059f708c437e', 'C) Número da EPS correspondente.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3b9efefd-b76e-4f92-9d86-6e0f0ff1b1cb', '8618fad2-b492-409e-a7c5-059f708c437e', 'D) Norma de qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('59414f04-7f84-45ce-945e-2bf21f11eebb', '8618fad2-b492-409e-a7c5-059f708c437e', 'E) Classificação AWS do consumível de soldagem', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8ba35659-c677-4098-b7b1-58acc4cef6c0', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 9', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a7614072-54ab-4594-84c7-22f88108a213', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '8ba35659-c677-4098-b7b1-58acc4cef6c0', 'multiple_choice', 'Qual alternativa apresentada a seguir deve ser informada em um “Registro da Qualificação de Procedimento de Soldagem” (RQPS)? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6479b5af-5ff2-4cdf-9749-3aaaa2618cb7', 'a7614072-54ab-4594-84c7-22f88108a213', 'A) Nome do fabricante do gás de proteção (ou mistura).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('092509fa-e430-4c81-bda7-5f57f9fe4f81', 'a7614072-54ab-4594-84c7-22f88108a213', 'B) Espessura do metal depositado.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fcf7c534-97e6-4cd8-a478-81f04e69e670', 'a7614072-54ab-4594-84c7-22f88108a213', 'C) Temperatura do ambiente no momento da qualificação do procedimento de soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed46dd08-140a-4d42-920f-30b55c2f49a4', 'a7614072-54ab-4594-84c7-22f88108a213', 'D) Nome do equipamento usado para medir a largura do cordão de solda.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b128d87-aca8-4a08-a73c-941f394268db', 'a7614072-54ab-4594-84c7-22f88108a213', 'E) Modelo da fonte de energia usada na qualificação do procedimento de soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1c78fe57-1e9c-4045-b596-271889221306', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 10', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f152724f-d924-42ce-a3c6-1ab2407c4317', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '1c78fe57-1e9c-4045-b596-271889221306', 'multiple_choice', 'Quanto ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b5fa030-ec56-4f59-b2f0-11d40b759874', 'f152724f-d924-42ce-a3c6-1ab2407c4317', 'A) Importante o registro das faixas dos valores de cada parâmetro de soldagem que estiver envolvida na qualificação de procedimento de soldagem.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9dfbd341-1d59-4c06-a61e-7959932e5c36', 'f152724f-d924-42ce-a3c6-1ab2407c4317', 'B) Durante a soldagem da peça de teste referente a uma qualificação de procedimento, é fundamental a presença do Inspetor de Soldagem Nível 1.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81701904-4524-4220-9079-a1eed1ce9b1b', 'f152724f-d924-42ce-a3c6-1ab2407c4317', 'C) Informar o nome do fabricante do metal de base é facultativo neste documento, porém, o mais importante é informar a especificação deste material metálico.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('82b8b386-88a9-48f6-ac1a-fc9ac4aa3384', 'f152724f-d924-42ce-a3c6-1ab2407c4317', 'D) Caso um backing (ou cobre-junta) seja utilizado, deve ser registrado no RQPS o tipo de material que este dispositivo é feito.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('73f5872e-fdea-472f-9d59-9f25547a37c4', 'f152724f-d924-42ce-a3c6-1ab2407c4317', 'E) Na qualificação de procedimento de soldagem usando um eletrodo revestido do tipo básico, não se anexa ao RQPS o relatório que comprova que aquele consumível foi ressecado conforme recomendação do seu fabricante.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d578adba-f6e5-4259-bd6d-9becafaf1089', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 11', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2f5f5283-406d-4822-9121-a8c8f9db9006', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'd578adba-f6e5-4259-bd6d-9becafaf1089', 'multiple_choice', 'Quanto ao documento “Registro da Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7c1b5de7-e226-4c86-b064-58b32df09fb6', '2f5f5283-406d-4822-9121-a8c8f9db9006', 'A) Independentemente do tipo de qualificação que esteja sendo realizada, o cálculo do aporte térmico introduzido na junta deve ser feito para todos os passes.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7e9fd547-32c6-4d10-8c24-b1d3ee4b44ad', '2f5f5283-406d-4822-9121-a8c8f9db9006', 'B) No caso do uso de eletrodo revestido em uma determinada qualificação de procedimento de soldagem, o diâmetro deste consumível a ser informado deve ser medido na região do revestimento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b0f292ef-3564-49b4-abdf-6a6d0d29a47e', '2f5f5283-406d-4822-9121-a8c8f9db9006', 'C) O valor da intensidade de corrente elétrica deve ser obtido diretamente da fonte de energia.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('851b89d8-540a-4e0f-bb36-3f226999ce41', '2f5f5283-406d-4822-9121-a8c8f9db9006', 'D) Caso o ensaio macrográfico seja obrigatório em uma determinada qualificação, é necessário que se guarde aquele corpo de prova, enquanto a qualificação for válida.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c5c823e7-b295-4101-9e32-8b436b1b66ca', '2f5f5283-406d-4822-9121-a8c8f9db9006', 'E) Todos os instrumentos de medida empregados em uma determinada qualificação de procedimento de soldagem devem estar calibrados, sendo obrigatória a anexação ao RQPS da cópia de todos os certificados de calibração.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c7eabff1-2fcf-4b96-a97a-55b2ad7d1a2f', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 12', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('93cebea7-86df-41aa-ab31-c6c1ebf5e036', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'c7eabff1-2fcf-4b96-a97a-55b2ad7d1a2f', 'multiple_choice', 'Analisando os documentos “Especificação de Procedimento de Soldagem” (EPS) e “Registro de Qualificação de Procedimento de Soldagem” (RQPS), assinale a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4bbb4756-dba6-49ca-89df-98984898b67f', '93cebea7-86df-41aa-ab31-c6c1ebf5e036', 'A) No RQPS, é informada a faixa de espessura do metal de base qualificada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6fa81134-ee57-48ec-818c-7f6c1b4c59c0', '93cebea7-86df-41aa-ab31-c6c1ebf5e036', 'B) Na EPS, é informada a posição de soldagem da peça de teste utilizada durante a qualificação.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('23486285-d308-49f2-a1db-7d2e53c2beab', '93cebea7-86df-41aa-ab31-c6c1ebf5e036', 'C) Caso o eletrodo de tungstênio (processo GTAW) seja do tipo toriado (por exemplo), esta informação deve estar registrada em ambos os documentos.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5dd9fbed-3c57-4f7e-b757-f7e5bd72e626', '93cebea7-86df-41aa-ab31-c6c1ebf5e036', 'D) Enquanto no RQPS registra-se apenas a classificação AWS do consumível de soldagem empregado na qualificação, na EPS registra-se apenas o “F-Number” deste consumível (caso a qualificação esteja sendo feita segundo o código ASME IX).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('064df33e-486e-4c18-bebe-f9d8874d191a', '93cebea7-86df-41aa-ab31-c6c1ebf5e036', 'E) Tendo em vista que o eletrodo de tungstênio é fundamental no processo de soldagem GTAW, o modelo da tocha usada na qualificação deve ser informado no RQPS.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d2c29f73-a9d4-4719-949c-84cb0e6607e0', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 13', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('94bdef16-c2ab-4b5c-819d-462ebb2271c6', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'd2c29f73-a9d4-4719-949c-84cb0e6607e0', 'multiple_choice', 'Analisando especificamente o documento “Instruções de Execução e Inspeção de Soldagem” (IEIS), assinale a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8535eecc-8a71-4904-9102-76280024d83d', '94bdef16-c2ab-4b5c-819d-462ebb2271c6', 'A) A fabricação de um determinado equipamento exige a elaboração de uma IEIS própria.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48331d2c-b6ce-4828-8e71-4520d6992a3a', '94bdef16-c2ab-4b5c-819d-462ebb2271c6', 'B) Pelo elevado grau de informação e confidencialidade deste documento (IEIS), cabe ao Inspetor de Soldagem Nível 2 a responsabilidade de guardá-lo, de forma que os soldadores ou operadores de soldagem não tenham acesso às informações ali contidas.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9fa825cf-c834-4d84-8b31-f5cc710b3a89', '94bdef16-c2ab-4b5c-819d-462ebb2271c6', 'C) O desenho do equipamento a ser construído é uma das informações que deve ser apresentada em uma IEIS.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7c37634b-3eb0-4b5f-bde5-d698f3395a80', '94bdef16-c2ab-4b5c-819d-462ebb2271c6', 'D) A relação de ensaios não destrutivos que deverão ser realizados na fabricação de um equipamento, o momento quando deverão ser conduzidos e suas respectivas quantidades são informações que precisam estar contidas em uma IEIS.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20bd3957-8e55-4e60-a8ce-a27934bca017', '94bdef16-c2ab-4b5c-819d-462ebb2271c6', 'E) Em uma IEIS é fundamental que sejam informados os valores dos principais parâmetros de soldagem (limites ou faixas).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('890fc0e1-d427-4ae4-9e8c-d352af60e459', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 2', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f5439a5c-72d1-46f3-a609-444ec84d9aae', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '890fc0e1-d427-4ae4-9e8c-d352af60e459', 'multiple_choice', '7 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('75f5b051-f74f-4866-aaf1-b84795aa8ef5', 'f5439a5c-72d1-46f3-a609-444ec84d9aae', 'A) Como este documento é uma das fontes de informações que permite que uma determinada peça seja soldada, nele deverá estar registrado o nome dos soldadores qualificados que poderão participar desta soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('15292606-6530-4e2c-a5f5-63441db7f2f1', 'f5439a5c-72d1-46f3-a609-444ec84d9aae', 'B) A IEIS faz parte da relação de documentos indicados pelas normas ASME IX, AWS D1.1 e API 1104 para ser usado durante e após a fabricação de um equipamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('31573875-154b-43d7-b061-9ab4052f83ae', 'f5439a5c-72d1-46f3-a609-444ec84d9aae', 'C) Como uma IEIS possui uma numeração própria, isto torna desnecessário que sejam informados neste documento os diferentes números das EPSs (caso haja mais de uma) que irão fazer parte deste documento.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a435d1a-bf09-4dee-a5b1-7f4e6170719b', 'f5439a5c-72d1-46f3-a609-444ec84d9aae', 'D) A IEIS é um documento criado pela PETROBRAS, podendo ser encontrada na norma N-2301.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b3a9c9ee-d71b-4c0b-bf94-0417994565a2', 'f5439a5c-72d1-46f3-a609-444ec84d9aae', 'E) Por suas características, é um documento de uso diário do Inspetor de Soldagem Nível 2 para o controle da execução e inspeção da soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d1576684-1a9b-402b-9d0a-2aef2cc7daa6', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 15', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'd1576684-1a9b-402b-9d0a-2aef2cc7daa6', 'multiple_choice', 'Qual das informações apresentadas a seguir não precisa estar informada em uma IEIS? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e9941d75-10ca-4086-a300-f50726766f4a', '1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', 'A) Número do Registro de Qualificação de Procedimento de Soldagem.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff4c2d4c-1ded-4095-816d-6c0a511fb342', '1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', 'B) Tipo de corrente, polaridade e faixa de valores da intensidade de corrente elétrica.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20a4429a-51f2-4853-b1a5-bd91d0df569a', '1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', 'C) Faixas de valores de tensão do arco e velocidade de soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6c5de702-0b34-4919-b4ab-684e9e168bb1', '1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', 'D) Número da Especificação de Procedimento de Soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92b5397f-3ffa-4840-a7f8-1e13ce37d135', '1b22d5b9-8a5a-4235-ba56-1c008e5aa10a', 'E) Se a norma de projeto de fabricação do equipamento for a norma ASME Seção VIII, deve ser informado o “P-Number” de cada metal base a ser soldado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a3c54edb-aa3d-4ae8-8fc5-b449891ba5fb', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 16', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'a3c54edb-aa3d-4ae8-8fc5-b449891ba5fb', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não precisa ser informada no documento “Instruções de Execução e Inspeção de Soldagem” (IEIS)? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('514dae70-7305-4893-939e-43f6d24e7779', 'd5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', 'A) Técnica a ser usada na limpeza inicial da junta antes do início da soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1687dee0-2335-4afb-9038-95b02b4d653f', 'd5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', 'B) Técnica a ser usada na limpeza entre passes.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48c55bbc-0a36-48ab-8f77-87c3c64318f6', 'd5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', 'C) Técnica a ser usada na goivagem da solda.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa539bf7-f6e0-4d0c-a6f7-d2fabe396179', 'd5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', 'D) Técnica a ser usada na deposição dos cordões de solda.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('60a961cf-e5e5-458b-b4f4-4eda62ff88a1', 'd5e6bebb-11e5-418a-a6ba-fefdd0dfd0c3', 'E) Técnica a ser usada na medição do valor das temperaturas de pré- aquecimento e interpasse.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5a49bf75-59b4-45b0-9d8e-e36d6363cdd6', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 17', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8676099a-15ac-45e4-924f-18af224f24fa', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '5a49bf75-59b4-45b0-9d8e-e36d6363cdd6', 'multiple_choice', 'No que diz respeito ao documento “Registro da Qualificação de Soldadores e Operadores de Soldagem”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9be87413-f891-4994-9f67-e0b7fd235994', '8676099a-15ac-45e4-924f-18af224f24fa', 'A) O soldador ou operador de soldagem que tiver sua qualificação aprovada em relação uma norma de qualificação, este profissional não poderá trabalhar em uma obra que seja conduzida por outra norma de qualificação.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('22236ae8-ed29-4f2e-89af-39f265afa0f1', '8676099a-15ac-45e4-924f-18af224f24fa', 'B) O soldador ou operador de soldagem só pode trabalhar fora de suas faixas qualificadas, quando houver uma autorização formal assinada por um Inspetor de Soldagem.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e00c78ab-6968-497e-b18d-5dd8c9dc181f', '8676099a-15ac-45e4-924f-18af224f24fa', 'C) A qualificação de um soldador ou operador de soldagem é feita observando todos os parâmetros e condições estabelecidos em uma Especificação de Procedimento de Soldagem já qualificada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d1b07df-c3c3-4756-9995-66cb40aebe0f', '8676099a-15ac-45e4-924f-18af224f24fa', 'D) Um soldador ou operador de soldagem encontra-se qualificado, quando os resultados dos ensaios de sua peça de teste for considerada aprovada, de acordo com os critérios estabelecidos pela norma de qualificação usada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c31c1370-102d-438b-8377-1badcdae6bb6', '8676099a-15ac-45e4-924f-18af224f24fa', 'E) O soldador ou operador de soldagem pode estar qualificado em mais de um processo de soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cd3c930e-fc2a-4227-838c-517447941c15', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 19', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('184980a3-35b7-439f-bd6d-8d681baa9c52', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'cd3c930e-fc2a-4227-838c-517447941c15', 'multiple_choice', 'Em relação ao documento “Registro da Qualificação de Soldadores e Operadores de Soldagem”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ec8a5db0-d26c-45ad-8e56-1c2112b498d1', '184980a3-35b7-439f-bd6d-8d681baa9c52', 'A) A validade da qualificação de um soldador ou operador de soldagem só é interrompida, quando o mesmo se ausenta de suas funções por um período superior a 6 (seis) meses, como, por exemplo, em caso de acidente de trabalho.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa485a1e-2e07-4656-859d-254c88e02a23', '184980a3-35b7-439f-bd6d-8d681baa9c52', 'B) Um ensaio visual e um radiográfico da peça de teste, dependendo da norma de qualificação, muitas vezes são os únicos testes realizados para qualificar um soldador ou operador de soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('17a99700-4ac4-41df-9858-5ff301d3765d', '184980a3-35b7-439f-bd6d-8d681baa9c52', 'C) Dependendo da norma de qualificação usada para qualificar um soldador ou operador de soldagem, são solicitados os seguintes ensaios em sua peça de teste: visual, radiográfico e dobramento. Este último é solicitado para os profissionais que irão utilizar o processo GMAW (curto-circuito).', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3f077597-0e39-4e19-827c-0da62d337fa0', '184980a3-35b7-439f-bd6d-8d681baa9c52', 'D) O soldador ou operador de soldagem, qualificado pela norma ASME IX, poderá soldar metais de base com diferentes “P-Number”s, além daquele P-Number da peça de teste usado em sua qualificação.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('96c91d84-1660-4e59-9766-ce4d969228e4', '184980a3-35b7-439f-bd6d-8d681baa9c52', 'E) O soldador ou operador de soldagem, qualificado pela norma ASME IX, poderá utilizar consumíveis com diferentes classificações AWS, além daquela classificação AWS usada em sua qualificação.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c0e70f28-8523-4113-878f-96162dead56a', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 20', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('359a486a-1143-4e81-a24c-f9da3fe60da6', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'c0e70f28-8523-4113-878f-96162dead56a', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não precisa constar no documento “Relação de Soldadores e Operadores de Soldagem Qualificados” (norma de qualificação: ASME IX)? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18f99f01-107a-4a5c-9b91-09463ee5c3f1', '359a486a-1143-4e81-a24c-f9da3fe60da6', 'A) Progressão da soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee4bddd8-9720-416f-8120-dde610f4a12d', '359a486a-1143-4e81-a24c-f9da3fe60da6', 'B) Processo de soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('56c42037-d2e8-4df5-a756-c6fb90d3144f', '359a486a-1143-4e81-a24c-f9da3fe60da6', 'C) Nome do Soldador ou Operador de Soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('89e3d46b-bb62-4031-bf8d-57292f020ea1', '359a486a-1143-4e81-a24c-f9da3fe60da6', 'D) Número do RQPS referência.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bca087d3-1596-4146-91f9-eaf56c8e4d43', '359a486a-1143-4e81-a24c-f9da3fe60da6', 'E) Número da EPS referência.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bf63e1ef-18b0-4c49-a860-8ddae124eaa0', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 2', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('df95d203-c662-4ca4-b466-a19e679aac4f', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'bf63e1ef-18b0-4c49-a860-8ddae124eaa0', 'multiple_choice', '0 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cc07f131-691c-4d27-9672-c71316815074', 'df95d203-c662-4ca4-b466-a19e679aac4f', 'B) Uso de cobre-junta.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('11f0de98-19cd-4a6e-ad07-5201c360faf4', 'df95d203-c662-4ca4-b466-a19e679aac4f', 'C) F-Number.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('09829b67-a691-4dab-a4ed-ec9f26eb55ac', 'df95d203-c662-4ca4-b466-a19e679aac4f', 'D) Espessura do metal de base (T).', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c4b4a5dd-7c86-45b3-a842-6b033225072b', 'df95d203-c662-4ca4-b466-a19e679aac4f', 'E) Espessura do metal depositado (t).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('dd31764e-eb01-4f6d-b35c-a4424c3c6a1a', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 22', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'dd31764e-eb01-4f6d-b35c-a4424c3c6a1a', 'multiple_choice', 'Em relação ao documento “Controle de Desempenho do Soldador ou Operador de Soldagem”, marque a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7cebb20c-6432-4504-8c01-5206dba58ceb', 'cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', 'A) Documento que auxilia na análise da qualidade da mão de obra dos soldadores e operadores de um determinado setor de uma fábrica ou da fábrica como um todo.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c93ee89c-4e9e-477a-b65a-7a8254ccf31d', 'cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', 'B) Documento que permite observar o desempenho dos soldadores ou operadores de soldagem em uma determinada semana ou ao longo de um período maior, a partir do momento em que este documento foi criado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b3e8b2e-f933-4c08-a81d-059c73197c01', 'cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', 'C) Documento que analisa o desempenho dos soldadores ou operadores de soldagem a partir dos resultados dos ensaios radiográficos e/ ultrassônicos executados em suas juntas soldadas na fábrica.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('234b6b6b-e64e-435b-8b25-c3133479dd04', 'cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', 'D) A elaboração deste documento não está vinculada a uma EPS ou outro documento usado na área da soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4d6a93b9-c907-4716-9503-0f824f793b90', 'cbe3bde3-698a-480c-a8d7-d3c2e0f99d59', 'E) A validade da qualificação de um soldador ou operador de soldagem depende exclusivamente de seus resultados encontrados neste documento.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('76ee697b-405e-4ec6-a708-eeb9c16a9f7e', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 24', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('80ed62ca-4b8b-423f-9c03-7f2fb6801270', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '76ee697b-405e-4ec6-a708-eeb9c16a9f7e', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não precisa ser informada durante o preenchimento do documento “Controle de Desempenho do Soldador ou Operador de Soldagem”, marque a alternativa correta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('669e2c24-7ac8-497d-a5de-e62d2e2e6954', '80ed62ca-4b8b-423f-9c03-7f2fb6801270', 'A) Identificação do Soldador ou Operador de Soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40eef485-9803-49a7-8433-6a078408f5c7', '80ed62ca-4b8b-423f-9c03-7f2fb6801270', 'B) Data de realização da avaliação dos resultados dos ensaios radiográficos e/ou ultrassônicos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6abd028f-f710-4eef-85fb-603bdb1f7192', '80ed62ca-4b8b-423f-9c03-7f2fb6801270', 'C) Número de quantidade de radiografias aprovadas em um determinado período de tempo.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4d2904be-a355-4cf5-9780-302fd8580c97', '80ed62ca-4b8b-423f-9c03-7f2fb6801270', 'D) Localização do defeito no interior da junta soldada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('abcc6b45-d834-46a0-b8ff-35b9d014a6f7', '80ed62ca-4b8b-423f-9c03-7f2fb6801270', 'E) Somatório das extensões de juntas consideradas reprovadas pelo ensaio ultrassônico em um determinado período de tempo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e8470501-22b8-4b47-8342-d067ba61369f', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 25', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'e8470501-22b8-4b47-8342-d067ba61369f', 'multiple_choice', 'No que diz respeito ao documento “Controle de Desempenho de Soldadores e Operadores de Soldagem”, pode-se afirmar que: ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('367e93f1-0462-4965-9983-fa62651823ef', 'eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', 'A) Para um melhor controle da qualidade, o documento deve ser atualizado semanalmente.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('550e2a67-84d2-4f86-9824-7856caa8a31b', 'eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', 'B) Documento baseia-se no percentual de radiografias aprovadas.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ad5d40ab-7e7b-4f21-a601-a61f90d57fb1', 'eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', 'C) Tem por objetivo avaliar a produtividade de cada soldador em um determinado período de tempo.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fea6f7ee-d3e1-43c5-89a7-c31ac4c51a9c', 'eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', 'D) Documento que permite controlar a assiduidade dos soldadores e operadores de soldagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c02d2ed2-d01a-42e0-840b-f21eb53dd31c', 'eb26564a-9a77-4ac4-9fbc-c83e5b2e746a', 'E) Documento que deve integrar o conjunto de documentos referentes à qualificação do soldador ou operador de soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0d18dd2b-f3c6-44c0-a0da-4cda9608c338', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 26', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('82862d24-12cc-4f0b-865b-cedfa7b0fbbf', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '0d18dd2b-f3c6-44c0-a0da-4cda9608c338', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique a informação que não precisa constar no documento “Relatório de Inspeção de Produto”? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b9f7434c-bfc3-4782-994f-2b88cacee671', '82862d24-12cc-4f0b-865b-cedfa7b0fbbf', 'A) Conclusão do relatório.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e1071ce2-91cf-40cd-b058-b5a5bdc1cf42', '82862d24-12cc-4f0b-865b-cedfa7b0fbbf', 'B) Descrição do produto ou equipamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c6e153c1-4825-41f4-b5cd-6898964bbaeb', '82862d24-12cc-4f0b-865b-cedfa7b0fbbf', 'C) Objetivo da inspeção.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67c7da64-4641-4f16-b7a9-8c7fd2b54aa3', '82862d24-12cc-4f0b-865b-cedfa7b0fbbf', 'D) Nome do Inspetor de Soldagem Nível 2, com seu respectivo número de identificação, responsável pela soldagem do produto ou equipamento.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c4d0b041-882e-4143-b5f7-eeb442965e86', '82862d24-12cc-4f0b-865b-cedfa7b0fbbf', 'E) Resultados da inspeção, contendo comentários claros e relevantes.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0756c82b-62be-4dbe-bd64-ddf68acb8b43', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 27', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9b9144f0-8b74-4adf-80aa-98cafc399bc5', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '0756c82b-62be-4dbe-bd64-ddf68acb8b43', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não necessita ser citada no documento “Relatório de Inspeção de Produto”? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('300af769-159c-4d4f-b58f-529d53aa3fcf', '9b9144f0-8b74-4adf-80aa-98cafc399bc5', 'A) Especificação do metal de base.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dada9b4a-a9c1-41a3-945f-ff548d914497', '9b9144f0-8b74-4adf-80aa-98cafc399bc5', 'B) Localização do equipamento no interior da fábrica, após sua instalação.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e1e376ac-cc34-4e21-b5d7-6e681e0b6d4f', '9b9144f0-8b74-4adf-80aa-98cafc399bc5', 'C) Norma de projeto de fabricação.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c38876f-94f7-483d-b84c-aaf8b5905a35', '9b9144f0-8b74-4adf-80aa-98cafc399bc5', 'D) Nome do fabricante do equipamento.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('048ae424-c2a4-4839-960f-5997f3e92c90', '9b9144f0-8b74-4adf-80aa-98cafc399bc5', 'E) Tipo de equipamento (exemplo: vaso de pressão, tubulação, etc.).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3b204101-30fa-43e2-a80e-60f2f9ea7172', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', 'activity', 'Questão 28', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c9d517ae-e801-42df-949a-80776e9dc1da', '15cb32e2-fdf3-46fb-b1bb-719b1f406887', '3b204101-30fa-43e2-a80e-60f2f9ea7172', 'multiple_choice', 'Qual dos documentos apresentados a seguir não necessita ser mantido sob a responsabilidade do Inspetor de Soldagem? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('273897a6-098e-4464-8774-8cdcece1d266', 'c9d517ae-e801-42df-949a-80776e9dc1da', 'A) Controle de Desempenho de Soldadores ou Operadores de Soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9b98b1f6-7dab-4b75-ab37-3d904d54bda1', 'c9d517ae-e801-42df-949a-80776e9dc1da', 'B) Registro da Qualificação de Procedimento de Soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('75da48d2-9f14-4869-9936-55fe7915668f', 'c9d517ae-e801-42df-949a-80776e9dc1da', 'C) Instruções de Ensaio e Inspeção de Soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('282679d3-1fee-447e-b689-f22c103803be', 'c9d517ae-e801-42df-949a-80776e9dc1da', 'D) Relação de Soldadores ou Operadores de Soldagem Qualificados.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c6a7f2ab-e13d-4632-893d-4c6549eef72c', 'c9d517ae-e801-42df-949a-80776e9dc1da', 'E) Número do lote do material utilizado no ensaio de líquido penetrante.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('1bf9de8d-d7c4-4fc8-bf44-005b878dca7f', 'c5555555-5555-5555-5555-555555555555', 'Introdução', 'Questões e atividades sobre Introdução', 8, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '1bf9de8d-d7c4-4fc8-bf44-005b878dca7f', 'Prática - Introdução', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6948652a-0aae-4a82-b268-0c6a9da7a43e', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f4597084-4f2f-4297-9a80-27cb6e0ab2b2', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '6948652a-0aae-4a82-b268-0c6a9da7a43e', 'multiple_choice', 'Um Inspetor de Soldagem Nível 1 foi indicado para participar de uma qualificação de um procedimento de soldagem. Das alternativas apresentadas abaixo, marque a única que realmente representa a sua atuação. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('348f030f-4a9b-4315-b346-711072e6d24a', 'f4597084-4f2f-4297-9a80-27cb6e0ab2b2', 'A) Interpretar os requisitos da norma técnica, no que se refere à soldagem, que conduzirá a qualificação;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4db05748-fc9a-48b5-9a70-df9c49180f6b', 'f4597084-4f2f-4297-9a80-27cb6e0ab2b2', 'B) Analisar os resultados dos ensaios não destrutivos realizados durante a qualificação;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('79d50e63-12a6-4a0b-b214-554351b9b79f', 'f4597084-4f2f-4297-9a80-27cb6e0ab2b2', 'C) Acompanhar a execução das peças de teste;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bbde37eb-399c-4725-b0b5-76576e2763f5', 'f4597084-4f2f-4297-9a80-27cb6e0ab2b2', 'D) Aprovar a qualificação ao final de todo o processo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f490a672-101c-426e-b9ca-77d0e4ddacc6', 'f4597084-4f2f-4297-9a80-27cb6e0ab2b2', 'E) Testemunhar a execução do ensaio mecânico de tração.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('12a94b23-bc40-4cbd-ae64-89b1bcb76ce2', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '12a94b23-bc40-4cbd-ae64-89b1bcb76ce2', 'multiple_choice', 'Durante a soldagem de uma junta de um determinado equipamento, qual das alternativas abaixo não condiz com a atuação de um Inspetor de Soldagem Nível 2. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef40ae3b-65fd-4839-9e08-24120373e943', '8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', 'A) Verificar a atuação dos soldadores na execução dos serviços;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c818f57-cf12-48e3-b845-5975bb495338', '8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', 'B) Verificar se a Especificação de Procedimento de Soldagem, que está sendo utilizada, está adequada ao serviço que se encontra em execução;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0539a07a-6ed1-49e5-91a4-7acf9f6a892d', '8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', 'C) Verificar se o soldador, que está executando a soldagem, está qualificado para a realização do serviço;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('97a150ba-f8a2-4084-a1e2-0f537521e3a3', '8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', 'D) Emitir laudo do ensaio não destrutivo Líquido Penetrante executado na face do chanfro antes do início da soldagem;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46550ce6-ee17-4671-b206-26e34efffc3a', '8d596afa-ebc7-4d22-aeb1-eae2c6d7da4f', 'E) Verificar se os equipamentos de soldagem utilizados estão de acordo com o especificado.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7f048589-e508-412c-b1d7-e34449d62070', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9cf59e9b-d39e-4ae2-b02d-37a911f32054', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '7f048589-e508-412c-b1d7-e34449d62070', 'multiple_choice', 'Após a finalização da soldagem de uma junta de topo, um Inspetor de Soldagem Nível 1 foi chamado para acompanhar a realização de um tratamento térmico. Assinale a única atividade que não condiz com a sua atuação. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('295fcfaa-0e6b-4264-8ffd-395c3a642274', '9cf59e9b-d39e-4ae2-b02d-37a911f32054', 'A) Verificar se a execução do tratamento térmico está sendo conduzido de acordo com os procedimentos de tratamento térmico e as instruções de fabricação e /ou execução; 2', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('48bce739-1061-4c03-a2b7-4ed3d3457045', '9cf59e9b-d39e-4ae2-b02d-37a911f32054', 'B) Permitir que o tratamento térmico seja realizado após a soldagem, independentemente do resultado dos ensaios não destrutivos;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d121ba0d-6821-482f-8571-65371c87801b', '9cf59e9b-d39e-4ae2-b02d-37a911f32054', 'C) Verificar se os ensaios não destrutivos realizados após o tratamento térmico foram realizados por profissionais qualificados.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b3dd871c-7191-44a4-90d9-ace51d4e21fa', '9cf59e9b-d39e-4ae2-b02d-37a911f32054', 'D) O Inspetor de Soldagem Nível 1 não pode verificar se o tratamento térmico está sendo executado de acordo com as normas e especificações técnicas, tendo em vista que esta atividade só pode ser realizada por um Inspetor de Soldagem Nível 2.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('65f2c9fa-a519-46b8-94c9-6e803e5557bf', '9cf59e9b-d39e-4ae2-b02d-37a911f32054', 'E) Não é obrigatória a presença do Inspetor de Soldagem Nível 1 durante a realização do tratamento térmico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f21a3e52-6bc1-4167-b62f-957d12cf4883', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'f21a3e52-6bc1-4167-b62f-957d12cf4883', 'multiple_choice', 'Dentre as muitas atividades existentes durante a qualificação de um procedimento de soldagem, assinale a única atividade que um Inspetor de Soldagem Nível 2 não pode realizar. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12d3d91c-9865-4fbe-b6b6-0c6d817a72c7', 'e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', 'A) Realizar os dois ensaios de tração transversal;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('865dc64d-1d25-4a4b-89ca-194e19b1b56d', 'e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', 'B) Testemunhar a execução do ensaio de impacto;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff065f3e-ac82-43ec-b7f2-49de64a01b76', 'e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', 'C) Avaliar os resultados de todos os ensaios mecânicos em comparação com os critérios estabelecidos pelas normas técnicas;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3df3d0c4-ac5e-415d-82d4-88d53d0246df', 'e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', 'D) Emitir laudo do ensaio macrográfico realizado;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('56dee7bb-67c6-4c92-b433-35db10d48f62', 'e8ff0d5b-c3e1-47c7-9512-ad8cf027f638', 'E) Testemunhar as condições de preparação dos corpos-de-prova.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('258fb4c7-631c-4779-b756-2c3fd4e066e1', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c639b0ef-1999-45ee-893e-2db56892c92a', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '258fb4c7-631c-4779-b756-2c3fd4e066e1', 'multiple_choice', 'Correlacionando a atuação do Inspetor de Soldagem Nível 2 com os ensaios mecânicos que fazem parte da qualificação de um procedimento de soldagem, marque a alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f71b5d04-aaad-4c9b-8b87-843755960464', 'c639b0ef-1999-45ee-893e-2db56892c92a', 'A) O Nível 2 pode testemunhar a execução do ensaio de dobramento;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dca76b27-9684-4316-accd-f47a0dc1a78a', 'c639b0ef-1999-45ee-893e-2db56892c92a', 'B) O Nível 2 está autorizado a determinar o ensaio de dureza por meio de medidores portáteis;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c4176966-3406-42bb-bac7-521d0e778012', 'c639b0ef-1999-45ee-893e-2db56892c92a', 'C) O Nível 2 pode emitir laudos dos corpos-de-prova referentes aos ensaios macrográficos;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58928837-c7b8-4fc5-a1e4-3fd7155de75a', 'c639b0ef-1999-45ee-893e-2db56892c92a', 'D) O Nível 2 pode testemunhar as condições de preparação de todos os corpos-de-prova confeccionados para a qualificação em questão;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33c68849-66be-47fb-8c05-b5cdcbede0f5', 'c639b0ef-1999-45ee-893e-2db56892c92a', 'E) O Nível 2 pode testemunhar a execução do ensaio de tração.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('44fafaaf-35a5-4395-986e-059f71cef1fd', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 6', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5e872dee-6843-4ae5-bc92-6682db00bd46', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '44fafaaf-35a5-4395-986e-059f71cef1fd', 'multiple_choice', 'Quando se refere aos temas “Consumíveis de Soldagem” e “Material de Base”, indique qual das alternativas abaixo é de responsabilidade única do Inspetor de Soldagem Nível 2: ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('08b0e9fd-b014-453f-bd25-b2c2af1c123e', '5e872dee-6843-4ae5-bc92-6682db00bd46', 'A) Contatar o Setor de Vendas do fabricante do material de base (aço) para solicitar o material de base necessitado;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a9a7cfd8-0157-4f61-ab29-d77e62f41560', '5e872dee-6843-4ae5-bc92-6682db00bd46', 'B) Através da comparação entre marcações e documentos aplicáveis, checar se o material de base comprado foi exatamente o especificado;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2ea213ea-2655-472c-9729-29ff8d7fdfa6', '5e872dee-6843-4ae5-bc92-6682db00bd46', 'C) Verificar se os consumíveis de soldagem estão sendo corretamente armazenados, conforme recomendação do fabricante ou outros documentos aplicáveis;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('99352997-9b56-4523-8d24-75a1c87224f4', '5e872dee-6843-4ae5-bc92-6682db00bd46', 'D) Verificar se os consumíveis de soldagem recebidos na fábrica estão corretos, comparando entre os certificados de qualidade dos consumíveis e os requisitos das normas e especificações técnicas dos produtos;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be7b35bc-3898-486e-b6de-3e805d920cc6', '5e872dee-6843-4ae5-bc92-6682db00bd46', 'E) Verificar se, dependendo do teor da umidade relativa do ar, haverá a necessidade de aumentar o tempo de ressecagem dos eletrodos revestidos básicos, conforme estabelecido no catálogo do revendedor do consumível.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('792d6d69-33a2-4c57-8c98-1b58a55897d4', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 7', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bce688a3-895e-4dae-9963-1c657b1b6423', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', '792d6d69-33a2-4c57-8c98-1b58a55897d4', 'multiple_choice', 'Em relação ao Termo de Conduta e Ética que regem o Sistema Nacional de Qualificação e Certificação de Inspetores de Soldagem, marque a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2fcd3214-bb6b-4709-99d6-5215e8c81ccd', 'bce688a3-895e-4dae-9963-1c657b1b6423', 'A) Caso um dos itens que constam no Termo de  Conduto e Ética não seja respeitado, a penalidade que será imposta ao Inspetor de Soldagem é a revogação de sua certificação;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e160e13f-1796-415a-afef-ccfed116dc83', 'bce688a3-895e-4dae-9963-1c657b1b6423', 'B) O Certificado obtido pelo Inspetor de Soldagem só será válido se o profissional atender os critérios exigidos pela Norma NBR 14842;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5666f8d3-11b7-4273-abd4-32832dfc6ef6', 'bce688a3-895e-4dae-9963-1c657b1b6423', 'C) Em nenhuma hipótese, tanto os Inspetores de Soldagem quanto os Empregadores, não podem se valer de certificados ou do logotipo do sistema, para fins considerados fraudulentos;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9cceccf9-ea7f-407e-a509-6d6aa09a6316', 'bce688a3-895e-4dae-9963-1c657b1b6423', 'D) O Inspetor de Soldagem Nível 2 pode assinar e atuar em qualquer Norma(s) Principal(is) de Qualificação, desde que ele comprove, em carteira, que tenha 15 anos, no mínimo, de experiência profissional na área da Soldagem;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c08e88bc-70b7-445c-aae8-6ae56047836d', 'bce688a3-895e-4dae-9963-1c657b1b6423', 'E) O certificado atesta que o Inspetor de Soldagem demonstrou nível de competência aceitável através dos exames de qualificação realizados no CEQUAL.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('feae9a77-9b2b-4724-abd0-be9e247f9756', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', '92bc9dbc-bc6b-4a66-95f3-e2b6d9e1715e', 'feae9a77-9b2b-4724-abd0-be9e247f9756', 'multiple_choice', 'Em relação à validade do Certificado obtido pelo Inspetor de Soldagem após sua aprovação, marque a única alternativa incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9671f5da-bc78-4833-b0cc-de72c5d6d7c4', 'd4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', 'A) O mesmo só é válido quando todas as taxas tenham sido pagas pelo Inspetor;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fc9245f7-d343-4f91-ba54-9053549a4578', 'd4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', 'B) A única assinatura que deve constar no certificado é a do próprio Inspetor;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bc13eeb0-87ef-4fa9-afce-23ee3d1e20b7', 'd4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', 'C) O período de validade do certificado se encontra registrado no verso do documento;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('abcd2f0d-9564-4189-87a4-a482ee6def64', 'd4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', 'D) O papel do certificado deve estar timbrado com o logotipo do sistema;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('66fea638-0b4c-4f59-bfaf-6d701113cede', 'd4be28e5-5e78-4cb4-b1b7-04d8611e7ef3', 'E) O Inspetor deve comprovar aptidão física e acuidade visual, de acordo com os critérios estabelecidos pela Norma NBR 14842.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('5ae37657-1868-42e1-84fe-3916a5cffe81', 'c5555555-5555-5555-5555-555555555555', 'Metalurgia da Soldagem', 'Questões e atividades sobre Metalurgia da Soldagem', 9, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('98b9e862-374e-4a44-aaf0-8def86783032', '5ae37657-1868-42e1-84fe-3916a5cffe81', 'Prática - Metalurgia da Soldagem', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4b67ff6f-d07b-4685-bf9e-b25f1562f48e', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2b327ce4-c6a6-4e86-b29f-c24209e61072', '98b9e862-374e-4a44-aaf0-8def86783032', '4b67ff6f-d07b-4685-bf9e-b25f1562f48e', 'multiple_choice', 'Quanto ao aporte térmico (“heat input”) produzido durante a soldagem, pode-se afirmar que: ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58f8bf5b-b3d3-4290-b75c-62364233a089', '2b327ce4-c6a6-4e86-b29f-c24209e61072', 'K) O aporte térmico que se introduz em uma junta é cada vez maior, quando os valores de corrente e tensão do arco são cada vez menores, se mantendo a velocidade de soldagem constante.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4834c88-e9c9-435e-a283-2fbdb5ef2755', '2b327ce4-c6a6-4e86-b29f-c24209e61072', 'L) O aporte térmico é diretamente proporcional aos valores da corrente elétrica e tensão, e inversamente proporcional à velocidade de soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fde07335-1005-486a-ab56-0dfd12e4c306', '2b327ce4-c6a6-4e86-b29f-c24209e61072', 'M) O aporte térmico é diretamente proporcional à velocidade de soldagem, e inversamente proporcional aos valores da corrente elétrica e tensão.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d77a51f0-95c7-48e6-8c35-10bfa6a8f972', '2b327ce4-c6a6-4e86-b29f-c24209e61072', 'N) O aporte térmico é uma variável que depende diretamente das propriedades física e mecânica do metal de base que será soldado.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('23d866c2-5229-4367-919b-9d0dfc9aaefd', '2b327ce4-c6a6-4e86-b29f-c24209e61072', 'O) Quanto maior a velocidade de alimentação de arame nos processos GMAW e FCAW, menor o aporte térmico introduzido na junta durante a soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cbc1a6af-2fd9-459a-945d-17083719b6de', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('431fb893-0444-4934-9298-bcbf29aaf665', '98b9e862-374e-4a44-aaf0-8def86783032', 'cbc1a6af-2fd9-459a-945d-17083719b6de', 'multiple_choice', 'Analisando os diferentes tipos de sistema cristalino (“Cúbico de Corpo Centrado” – CCC, “Cúbico de Face Centrada” – CFC e “Hexagonal Compacto” - HC) que podem ser encontrados nos metais sólidos, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9537f3bc-cb43-491d-93fa-fa5ece79851e', '431fb893-0444-4934-9298-bcbf29aaf665', 'A) A vibração dos átomos em uma estrutura cristalina é função direta da temperatura; ou seja, quanto maior a temperatura, maior a vibração dos átomos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ce6f057d-735f-4292-b99b-9b9bc7b2fa67', '431fb893-0444-4934-9298-bcbf29aaf665', 'B) O sistema cristalino “Cúbico de Corpo Centrado” (CCC) é representado por um cubo, tendo 8 átomos localizados em seus vértices e um no centro. O Fe, à temperatura ambiente, apresenta este tipo de sistema cristalino.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9db08e45-e217-4d94-8c72-982aaa21aa71', '431fb893-0444-4934-9298-bcbf29aaf665', 'C) O sistema cristalino “Cúbico de Face Centrada” (CFC) é representado por um cubo, tendo 8 átomos localizados em seus vértices e 6 átomos dispostos no centro das faces. Os metais Níquel e Alumínio são exemplos de materiais metálicos que apresentam este tipo de sistema cristalino.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6d3228c3-11cc-44d0-89ff-55c1dce1f61b', '431fb893-0444-4934-9298-bcbf29aaf665', 'D) As células unitárias dos metais que apresentam um sistema cristalino do Cúbico de Face Centrada (CFC) possuem maior número de planos de maior densidade atômica do que os metais Cúbicos de Corpo Centrado (CCC) e por esta característica os metais do tipo CFC apresentam menor tenacidade do que os metais do tipo CCC.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b6998d4f-de41-4c58-bb14-97ce424c4cdb', '431fb893-0444-4934-9298-bcbf29aaf665', 'E) A Martensita é uma microestrutura que apresenta um sistema cristalino do tipo Hexagonal Compacto.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9ad33aed-718e-444d-b355-4e3095187a68', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b81624a5-1d8c-436c-8e8b-def1f63b95f2', '98b9e862-374e-4a44-aaf0-8def86783032', '9ad33aed-718e-444d-b355-4e3095187a68', 'multiple_choice', 'Quais são os nomes das soluções sólidas de carbono no “ferro delta”, no “ferro gama” e no “ferro alfa”, respectivamente: ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('12188856-3e22-4cf8-909d-18beebe505d0', 'b81624a5-1d8c-436c-8e8b-def1f63b95f2', 'A) Ferrita delta, austenita e ferrita.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eeda8926-6c0d-4651-a0fd-3da88d83fa9a', 'b81624a5-1d8c-436c-8e8b-def1f63b95f2', 'B) Ferrita delta, ferrita e austenita.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('11fb7837-3bbe-4a3d-973e-980531a55893', 'b81624a5-1d8c-436c-8e8b-def1f63b95f2', 'C) Austenita, ferrita delta e ferrita.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9459756b-5c8c-416e-a121-8b7437bffacc', 'b81624a5-1d8c-436c-8e8b-def1f63b95f2', 'D) Austenita, ferrita e ferrita delta.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1f5bfbef-f1f4-4f31-89fd-6094a6ddf04a', 'b81624a5-1d8c-436c-8e8b-def1f63b95f2', 'E) Ferrita, austenita e ferrita delta.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e057da41-61da-4775-b269-ee11ed98016c', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 4', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e7b35925-dc5e-43b4-84a9-49ae8f018d24', '98b9e862-374e-4a44-aaf0-8def86783032', 'e057da41-61da-4775-b269-ee11ed98016c', 'multiple_choice', 'A Difusão dos átomos é um fenômeno extremamente presente e importante na soldagem de metais e suas ligas. Das alternativas a seguir abordando este fenômeno, assinale aquela incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2848326-73f0-4d2b-b28c-43b9a0f55a3f', 'e7b35925-dc5e-43b4-84a9-49ae8f018d24', 'A) Na região cortada de um aço carbono, por exemplo, pelo processo oxi- gás, constata-se ali um enriquecimento de carbono, como conseqüência da difusão dos átomos de C pelo calor produzido pela chama do gás.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8251af1d-19ac-4913-be79-211b938a2ab4', 'e7b35925-dc5e-43b4-84a9-49ae8f018d24', 'B) A difusão dos átomos é capaz de modificar as propriedades mecânicas de uma determinada região do material metálico.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d69b603-5733-4ce4-be09-bdb12e5cb7b0', 'e7b35925-dc5e-43b4-84a9-49ae8f018d24', 'C) O aumento da temperatura em um metal (ou liga metálica) no estado sólido produz uma menor vibração dos átomos em torno da sua posição de equilíbrio.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3f433be5-a330-4bed-8691-0df89f3a49b6', 'e7b35925-dc5e-43b4-84a9-49ae8f018d24', 'D) A difusão de átomos nos contornos de grão ocorre mais rapidamente do que no seu interior, visto que naquelas regiões não há uma ordenação dos átomos, podendo, dessa forma, existir uma certa quantidade de vazios.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dc8913d3-3cf6-4c16-8f60-c49874926c42', 'e7b35925-dc5e-43b4-84a9-49ae8f018d24', 'E) A movimentação atômica, ocorrida em metais no estado sólido, pode ser provocada por uma vibração de átomos, que poderá ser tanto maior, quanto maior for a temperatura daquele material metálico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('cbd36011-5c53-4fe4-8e83-ad9b33b66d93', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 6', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d89b10cc-2c87-443c-851f-34ff9a881375', '98b9e862-374e-4a44-aaf0-8def86783032', 'cbd36011-5c53-4fe4-8e83-ad9b33b66d93', 'multiple_choice', 'Das faixas de temperatura apresentadas a seguir, assinale aquela que representa a temperatura de fusão do aço carbono (0,10%C). ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d0931383-b7fa-4504-b607-e0c9bd8ecc0a', 'd89b10cc-2c87-443c-851f-34ff9a881375', 'A) 1451 ºC - 1500ºC', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('72a9c68c-bc0f-4023-96d8-b07b3404b0c8', 'd89b10cc-2c87-443c-851f-34ff9a881375', 'B) 1501 ºC - 1550 ºC', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c276ced8-ba90-455a-8055-1ca5a7403c23', 'd89b10cc-2c87-443c-851f-34ff9a881375', 'C) 1401 ºC - 1450 ºC', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a7191f8b-ca8c-4b19-a0b1-f09fde300459', 'd89b10cc-2c87-443c-851f-34ff9a881375', 'D) 1351 ºC - 1400 ºC', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f9891f2-c8fc-4311-94f4-7afead3401a3', 'd89b10cc-2c87-443c-851f-34ff9a881375', 'E) 1551 ºC - 1600 ºC', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a392a791-2e89-4349-85a3-e757ba25d57f', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 7', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('731437df-4a9d-4a18-a34a-16f1125dee3a', '98b9e862-374e-4a44-aaf0-8def86783032', 'a392a791-2e89-4349-85a3-e757ba25d57f', 'multiple_choice', 'Analisando os diferentes sistemas cristalinos do aço carbono (0,10%C) em função da temperatura, assinale a alternativa a seguir que mostra esses sistemas à proporção que a temperatura decresce. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d7594c71-6843-4388-8a0a-b630dab19a45', '731437df-4a9d-4a18-a34a-16f1125dee3a', 'A) Austenita / Ferrita Delta / Ferrita (alfa).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fe74a8b7-6f7d-463d-b601-671eb860be3d', '731437df-4a9d-4a18-a34a-16f1125dee3a', 'B) Ferrita Delta / Ferrita (alfa) / Austenita.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d1b91c9-045e-4c32-91c0-df06385b522d', '731437df-4a9d-4a18-a34a-16f1125dee3a', 'C) Ferrita (alfa) / Ferrita Delta / Austenita.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('82a83cc5-0cf6-4ef9-a241-d3527ffb700f', '731437df-4a9d-4a18-a34a-16f1125dee3a', 'D) Ferrita (alfa) / Austenita / Ferrita Delta.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e083f6c-3532-4093-8ff3-2572dce17faa', '731437df-4a9d-4a18-a34a-16f1125dee3a', 'E) Ferrita Delta / Austenita / Ferrita (alfa).', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('13587beb-a583-4b8a-8507-9a977b6261c8', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 8', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('01269594-10e2-423b-8f39-6189a511cb1d', '98b9e862-374e-4a44-aaf0-8def86783032', '13587beb-a583-4b8a-8507-9a977b6261c8', 'multiple_choice', 'Qual a porcentagem de carbono na Cementita (Fe3C)? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('25d83464-a1d0-40de-9d63-ce21e1020a37', '01269594-10e2-423b-8f39-6189a511cb1d', 'A) 10,2%', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b2c632f4-091a-4f98-9110-c3b4cb115bb2', '01269594-10e2-423b-8f39-6189a511cb1d', 'B) 3,4%', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8acecef-224d-4f33-9380-6f8a139b54dd', '01269594-10e2-423b-8f39-6189a511cb1d', 'C) 5,0%', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1c1318ad-5ca7-4fa8-98d2-4f6e0e39cf10', '01269594-10e2-423b-8f39-6189a511cb1d', 'D) 6,7%', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d9b90129-83a7-4def-9ca7-ab51e6583a4a', '01269594-10e2-423b-8f39-6189a511cb1d', 'E) 9,9%', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6ff1e187-69fa-4378-9cd4-c96ee0e34ad0', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 9', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('260766ed-1f48-4c4a-b6d4-d88a896f3047', '98b9e862-374e-4a44-aaf0-8def86783032', '6ff1e187-69fa-4378-9cd4-c96ee0e34ad0', 'multiple_choice', 'Por definição, qual a porcentagem máxima de carbono que pode ser encontrada em um aço? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('782a9ddb-d525-4f94-ae41-42a11eaccf24', '260766ed-1f48-4c4a-b6d4-d88a896f3047', 'A) 1,0%', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dfe94839-851f-4da6-ae17-07aa6e7eea13', '260766ed-1f48-4c4a-b6d4-d88a896f3047', 'B) 2,0%', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5360e238-4572-416f-8a07-65f08d38a7e4', '260766ed-1f48-4c4a-b6d4-d88a896f3047', 'C) 3,0%', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('978a78dd-10fb-4746-8217-751ccffb7730', '260766ed-1f48-4c4a-b6d4-d88a896f3047', 'D) 4,0%', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('15105e49-525a-4157-b204-ae61b4461ae3', '260766ed-1f48-4c4a-b6d4-d88a896f3047', 'E) 5,0%', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1505eac0-1d16-4f83-8879-fa9bf1aea98a', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 10', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3687d1fa-a796-45e4-b3d6-6c9187e507c2', '98b9e862-374e-4a44-aaf0-8def86783032', '1505eac0-1d16-4f83-8879-fa9bf1aea98a', 'multiple_choice', 'O aço é uma liga composta basicamente pelos elementos químicos Fe e C que, em função dos minérios utilizados em sua fabricação, acabam agregando outros elementos químicos em sua composição química. Das alternativas a seguir, identifique o elemento químico que não é encontrado usualmente nos aços carbono. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3dd95cad-1691-47f3-9774-103e900f20f7', '3687d1fa-a796-45e4-b3d6-6c9187e507c2', 'A) Mn', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9b0be939-5a96-4d7c-bd5e-67fbb146a84b', '3687d1fa-a796-45e4-b3d6-6c9187e507c2', 'B) Si', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('64bb6caf-110e-4aa4-a1af-8f0ce6b34b91', '3687d1fa-a796-45e4-b3d6-6c9187e507c2', 'C) Nb', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('474215f6-fcc8-4933-9284-fb84539c9109', '3687d1fa-a796-45e4-b3d6-6c9187e507c2', 'D) S', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('058b6c6f-5621-4e5a-94f9-cb70af344a75', '3687d1fa-a796-45e4-b3d6-6c9187e507c2', 'E) P', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('76961939-858a-4f47-be6c-280a231fc7d9', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 11', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7f7a0bd1-3343-4730-8d14-b7d1931d20dd', '98b9e862-374e-4a44-aaf0-8def86783032', '76961939-858a-4f47-be6c-280a231fc7d9', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique os sistemas cristalinos da Ferrita (alfa), Austenita e Ferrita Delta, respectivamente, encontrados no aço carbono. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3bfc5cef-4d9c-4509-a090-4bd2dad5b700', '7f7a0bd1-3343-4730-8d14-b7d1931d20dd', 'A) Cúbico de Corpo Centrado; Cúbico de Corpo Centrado; Cúbico de Face Centrada', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0cfe7e4-ec7e-410b-9389-009cd7f58e4f', '7f7a0bd1-3343-4730-8d14-b7d1931d20dd', 'B) Cúbico de Corpo Centrado; Hexagonal Compacto; Cúbico de Corpo Centrado', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c373ca21-b95f-447a-9949-16c51c1f1402', '7f7a0bd1-3343-4730-8d14-b7d1931d20dd', 'C) Cúbico de Face Centrada; Cúbico de Face Centrada; Cúbico de Corpo Centrado', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3484c1c4-b23e-4c8f-b01d-3b23fe4cf520', '7f7a0bd1-3343-4730-8d14-b7d1931d20dd', 'D) Cúbico de Corpo Centrado; Cúbico de Face Centrada; Cúbico de Corpo Centrado', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8ca6e7aa-34e9-4401-b618-cb43c2bd3aa6', '7f7a0bd1-3343-4730-8d14-b7d1931d20dd', 'E) Hexagonal Compacto; Cúbico de Corpo Centrado; Cúbico de Face Centrada', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('687a66ae-0c8d-4530-a202-06968371e386', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 12', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ca9b52c4-19e4-4c23-bba2-7415cedaf554', '98b9e862-374e-4a44-aaf0-8def86783032', '687a66ae-0c8d-4530-a202-06968371e386', 'multiple_choice', 'O deslocamento para a direita das curvas TTT (Temperatura – Transformação – Tempo) é influenciado por alguns fatores metalúrgicos. Identifique a seguir a alternativa que não afeta esse deslocamento. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c1a62e8c-7d75-4aeb-b1b6-d16188407253', 'ca9b52c4-19e4-4c23-bba2-7415cedaf554', 'A) O tamanho do grão da austenita.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7599255f-76b3-43e9-80f0-7d31a9922cfc', 'ca9b52c4-19e4-4c23-bba2-7415cedaf554', 'B) O aumento do teor de C (até a percentagem de 0,8%).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7cde2666-71eb-4b2f-93f2-ea01e3028b9e', 'ca9b52c4-19e4-4c23-bba2-7415cedaf554', 'C) A homogeneidade do grão da austenita.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7e58e5ac-9333-4de1-9b12-206f3f1cac88', 'ca9b52c4-19e4-4c23-bba2-7415cedaf554', 'D) O aumento de teores de elementos de liga (à exceção do Co).', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee35363d-85b1-4300-84e2-89f2e00bfe51', 'ca9b52c4-19e4-4c23-bba2-7415cedaf554', 'E) A velocidade de resfriamento durante a soldagem.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8233891c-1aa7-42d9-81ca-0109234de629', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e7bfe422-972e-4a48-96de-5cabf6d40e01', '98b9e862-374e-4a44-aaf0-8def86783032', '8233891c-1aa7-42d9-81ca-0109234de629', 'multiple_choice', '5 \n\n<img src="/images/questions/page145_img1.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d8377dd-503c-427b-938f-565fc0f63664', 'e7bfe422-972e-4a48-96de-5cabf6d40e01', 'A) Tamanho do grão da ferrita.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7838b535-d5f6-46d6-b67d-6bf1da5587c0', 'e7bfe422-972e-4a48-96de-5cabf6d40e01', 'B) Uso de processos de soldagem que produzem grande aporte de calor.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b2295cd-c666-4bc9-9fe0-4bb53e6c4333', 'e7bfe422-972e-4a48-96de-5cabf6d40e01', 'C) Adoção da soldagem autógena.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c63a6372-e9e9-4207-945a-ed138af94251', 'e7bfe422-972e-4a48-96de-5cabf6d40e01', 'D) Homogeneidade do grão da ferrita.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3f517a21-f174-4992-a2c7-59d9a9f1bbc3', 'e7bfe422-972e-4a48-96de-5cabf6d40e01', 'E) Uso do gás Argônio no processo de soldagem MIG/MAG (GMAW).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8e051a1a-3f18-4050-9683-a6c03d0bd012', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 14', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', '98b9e862-374e-4a44-aaf0-8def86783032', '8e051a1a-3f18-4050-9683-a6c03d0bd012', 'multiple_choice', 'Analisando os pontos relativos aos itens A e B, mostrados na junta soldada de topo apresentada a seguir, identifique a alternativa correta. Admitir que a junta foi soldada com um processo de soldagem a arco elétrico, sem pré- aquecimento e pós-aquecimento, e tratamento térmico de alívio de tensões. \n\n<img src="/images/questions/page145_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('729508d4-8750-4979-8d4d-25fd5ec344a1', '413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', 'A) O tempo que o ponto A levou para atingir a sua temperatura máxima é menor do que o tempo que o ponto B levou para atingir a sua temperatura máxima.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2f548f0-aa5d-44c2-80c4-3386e1813954', '413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', 'B) O valor de dureza do ponto A é menor do que a dureza do ponto B, independentemente se A e B se encontram dentro ou fora da Zona Termicamente Afetada.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d05d0bab-5a8d-4167-9353-1c260ed09bc6', '413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', 'C) A velocidade de resfriamento do ponto A é maior do que a velocidade de resfriamento ponto B.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('befb8edf-18d9-4721-8ce8-0d7e6c5400d8', '413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', 'D) A temperatura máxima que o ponto A pode atingir é menor do que a temperatura máxima do ponto B.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5abffba5-4894-4407-8264-e6d8cdf07d09', '413fd60a-3aa9-4b4b-a83f-02fe5a8f34f9', 'E) Nenhuma análise pode ser feita, visto que a região da Zona Termicamente Afetada não foi mostrada na junta.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f1d12b57-59c7-44c6-9e40-4044129f7a40', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4c7da261-dabb-4ece-ae34-53321a86e864', '98b9e862-374e-4a44-aaf0-8def86783032', 'f1d12b57-59c7-44c6-9e40-4044129f7a40', 'multiple_choice', '6 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6aa9eb96-191d-4804-859c-c40f17441120', '4c7da261-dabb-4ece-ae34-53321a86e864', 'B) Processo TIG (GTAW).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7787b59d-94c6-41f7-8f21-6fd4acdd8844', '4c7da261-dabb-4ece-ae34-53321a86e864', 'C) Processo com Arame Tubular (FCAW).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('600922a1-783d-46e4-892e-7646549bad6d', '4c7da261-dabb-4ece-ae34-53321a86e864', 'D) Processo Manual com Eletrodo  Revestido.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('45269b64-77d2-4bc3-b307-dc7f152cd74c', '4c7da261-dabb-4ece-ae34-53321a86e864', 'E) Processo a Arco Submerso.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c00b4b14-f62d-4e91-b806-047a75af6fd8', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 16', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('25d33aca-06a2-4cff-a9d3-dcb01c05a137', '98b9e862-374e-4a44-aaf0-8def86783032', 'c00b4b14-f62d-4e91-b806-047a75af6fd8', 'multiple_choice', 'Caso pudéssemos usar 5 (cinco) diferentes processos de soldagem a arco elétrico [hipótese] para soldar um equipamento (espessura igual a 10 mm) na posição de soldagem Plana, empregando uma intensidade de corrente elétrica igual a 300A, uma tensão do arco igual a 22V e uma velocidade de soldagem igual a 20 mm/segundo, qual dos processos listados a seguir introduziria a maior energia de soldagem (aporte térmico) na junta soldada? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92bd8ccd-9585-4c03-95fb-cc9e8372f5f9', '25d33aca-06a2-4cff-a9d3-dcb01c05a137', 'A) Processo de soldagem TIG (GTAW)', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8ec90662-a7f9-4061-ae1b-763d08e8e474', '25d33aca-06a2-4cff-a9d3-dcb01c05a137', 'B) Processo de soldagem a arco submerso (SAW)', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('05b552ca-41e8-413b-a34c-4eb4b534bbab', '25d33aca-06a2-4cff-a9d3-dcb01c05a137', 'C) Processo de soldagem manual com eletrodo revestido (SMAW)', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('97d5ba88-ac43-46bb-b354-8ef32654084e', '25d33aca-06a2-4cff-a9d3-dcb01c05a137', 'D) Processo de soldagem MIG/MAG (GMAW)', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('840ff1bf-c870-4fec-b1d7-5e3e4a2b9834', '25d33aca-06a2-4cff-a9d3-dcb01c05a137', 'E) Processo de soldagem com arame tubular (FCAW)', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6efa307e-48f2-4d07-889d-94e985640c0e', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 17', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0d32cc3e-cb52-4441-a838-95c0b12dc56d', '98b9e862-374e-4a44-aaf0-8def86783032', '6efa307e-48f2-4d07-889d-94e985640c0e', 'multiple_choice', 'Quanto ao Ciclo Térmico produzido pela soldagem em um determinado ponto da junta soldada, identifique a seguir a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a819c941-e1fc-4d34-96c4-fd6d4cc8d359', '0d32cc3e-cb52-4441-a838-95c0b12dc56d', 'A) Do gráfico relativo ao ciclo térmico, conclui-se que o tempo que um determinado ponto da junta passa pela mesma temperatura (no aquecimento e no resfriamento) será sempre maior, quanto mais baixa for esta temperatura.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9795591-5a5c-405d-8b6f-4b4114bc1680', '0d32cc3e-cb52-4441-a838-95c0b12dc56d', 'B) Do gráfico relativo ao ciclo térmico, pode-se afirmar que o ponto da junta, em análise, sempre passará pela mesma temperatura duas vezes (uma relativa ao aquecimento e outra para o resfriamento), à exceção do momento quando aquele ponto atingir a temperatura máxima.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6fcd229e-af1a-452d-b829-f14a84866046', '0d32cc3e-cb52-4441-a838-95c0b12dc56d', 'C) Do gráfico relativo ao ciclo térmico, conclui-se que o tempo que se leva para que o ponto atinja a sua temperatura máxima é muito mais rápido do que o tempo necessário para que aquele ponto atinja a temperatura ambiente ao final da soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('915f37b9-d2df-4398-b7f7-5171f76d8d5f', '0d32cc3e-cb52-4441-a838-95c0b12dc56d', 'D) O ciclo térmico é uma variação da temperatura em função do tempo em um determinado ponto da junta soldada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c823ac5-b714-4160-96a4-0570baf3140b', '0d32cc3e-cb52-4441-a838-95c0b12dc56d', 'E) Analisando uma seção transversal de uma junta soldada, é possível afirmar que dois pontos localizados no mesmo lado da junta, no mesmo plano, mas em posições diferentes da junta, apresentarão o mesmo ciclo térmico.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9ca75f79-2c2e-488b-83c4-25e64cf6a197', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 200', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a73714a6-ba2b-473b-a26b-bf7114ada466', '98b9e862-374e-4a44-aaf0-8def86783032', '9ca75f79-2c2e-488b-83c4-25e64cf6a197', 'multiple_choice', 'C. \n\n<img src="/images/questions/page147_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa72cd2e-23c3-47f9-9e13-bb3af4b4d240', 'a73714a6-ba2b-473b-a26b-bf7114ada466', 'B) A taxa de aquecimento no intervalo 400 – 800 ºC foi de 80 ºC/s.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b61c5a6e-b09d-4bf7-9309-d39ac88862ba', 'a73714a6-ba2b-473b-a26b-bf7114ada466', 'C) A taxa de resfriamento no intervalo 400 – 800 ºC foi de, aproximadamente, 40 ºC/s.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('153373ed-961b-4be8-90bd-e5c96abb2d25', 'a73714a6-ba2b-473b-a26b-bf7114ada466', 'D) Pela temperatura máxima atingida no ponto A, conclui-se que este ponto encontra-se no interior da Zona Termicamente Afetada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d5dd1a2f-a2c3-4b66-a360-5ee15769e6a9', 'a73714a6-ba2b-473b-a26b-bf7114ada466', 'E) O procedimento de soldagem não solicitava a realização de um pós- aquecimento', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7d2f7b79-6026-42ae-82e8-51cafc023172', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4fb27427-a6be-4638-8848-5298d0d950a2', '98b9e862-374e-4a44-aaf0-8def86783032', '7d2f7b79-6026-42ae-82e8-51cafc023172', 'multiple_choice', '8 \n\n<img src="/images/questions/page148_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88ba8800-5992-46c2-95c7-4eb06c75be4a', '4fb27427-a6be-4638-8848-5298d0d950a2', 'D) A temperatura máxima e a velocidade de resfriamento dependem diretamente das propriedades químicas do material que está sendo soldado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5cad0039-3796-4e88-943f-a8b7327df8c4', '4fb27427-a6be-4638-8848-5298d0d950a2', 'E) A temperatura máxima atingida por um determinado ponto da junta varia diretamente com a sua distância até o centro da solda.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6f5ec6a6-11ad-4123-81cb-7ba4ce8e2f17', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 20', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('374674e7-0c57-49d3-8473-49359b8f3333', '98b9e862-374e-4a44-aaf0-8def86783032', '6f5ec6a6-11ad-4123-81cb-7ba4ce8e2f17', 'multiple_choice', 'Em relação ao fenômeno da Diluição que ocorre durante a soldagem, identifique a alternativa incorreta apresentada a seguir. \n\n<img src="/images/questions/page148_img1.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d97eb90d-f1ae-442e-9333-a50c68159d9a', '374674e7-0c57-49d3-8473-49359b8f3333', 'A) O estudo da diluição é muito importante, quando da necessidade de soldar metais dissimilares.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a1e0703d-6471-4969-aa34-d4d41da18ee7', '374674e7-0c57-49d3-8473-49359b8f3333', 'B) A diluição é uma função direta do processo que será usado na soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('929bdc95-fae7-49c8-a39d-0b2a1ae8cd14', '374674e7-0c57-49d3-8473-49359b8f3333', 'C) A diluição é uma função direta do procedimento de soldagem que será usado para executar uma determinada soldagem.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d3d3bf3e-98d9-457e-8e36-02c4f470dc0c', '374674e7-0c57-49d3-8473-49359b8f3333', 'D) A diluição é a movimentação de átomos no estado sólido em função da temperatura encontrada na região que está sendo soldada.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed5c94e4-f723-4def-b0f4-2acc4e2d3314', '374674e7-0c57-49d3-8473-49359b8f3333', 'E) Não há diluição quando da realização de uma soldagem autógena entre dois componentes.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('bdcac030-cb7f-4e02-a886-87450bc49d40', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 22', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5267645b-d160-466f-a4a4-b96eec777d95', '98b9e862-374e-4a44-aaf0-8def86783032', 'bdcac030-cb7f-4e02-a886-87450bc49d40', 'multiple_choice', 'O pré-aquecimento é uma técnica muito importante na soldagem de metais e é muito utilizada na indústria. A seguir, são apresentadas alternativas a respeito desta técnica e solicita-se que aquela incorreta seja identificada. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('de6a08dd-13b2-4f7d-aaf5-c981da6534ee', '5267645b-d160-466f-a4a4-b96eec777d95', 'A) O pré-aquecimento evita a formação de martensita.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9f9a2813-daba-4cd0-88e5-ee0a3b43e52b', '5267645b-d160-466f-a4a4-b96eec777d95', 'B) O pré-aquecimento aumenta a velocidade de difusão do hidrogênio difusível', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('442e6ce7-2f1f-413d-bfdb-5655c05e7d90', '5267645b-d160-466f-a4a4-b96eec777d95', 'C) O pré-aquecimento só é aplicado na soldagem de metais que apresentam excelentes condutibilidades térmicas, como por exemplo, cobre e alumínio.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f09b52f-bd61-41af-a82a-b43e4d5b09ef', '5267645b-d160-466f-a4a4-b96eec777d95', 'D) O principal efeito do pré-aquecimento é reduzir a velocidade de resfriamento da junta soldada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9c105b22-3c64-47c8-8865-ae35d80141f9', '5267645b-d160-466f-a4a4-b96eec777d95', 'E) O pré-aquecimento reduz a possibilidade de produzir fissuração pelo hidrogênio na ZTA da junta.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ce9b4b5b-81c6-4518-9522-75870224797d', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 23', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0dd8e02c-8442-4076-856b-55e8a874a254', '98b9e862-374e-4a44-aaf0-8def86783032', 'ce9b4b5b-81c6-4518-9522-75870224797d', 'multiple_choice', 'Em algumas situações, o pós-aquecimento é uma técnica de grande importância na soldagem de materiais metálicos. A seguir, são apresentadas alternativas a respeito desta técnica e solicita-se que seja identificada a afirmativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b20d2db3-4428-4aee-aa7b-4e6bc6753275', '0dd8e02c-8442-4076-856b-55e8a874a254', 'A) O pós-aquecimento pode ser realizado imediatamente após o encerramento da soldagem, podendo também, em inúmeras vezes, ser executado até, no máximo, uma hora após o fim da soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e15c7586-12b2-4c2f-89a1-785350d785a2', '0dd8e02c-8442-4076-856b-55e8a874a254', 'B) O pós-aquecimento deve ser feito em uma faixa de temperatura que varia entre 98 ºC e 102 ºC por um período de 48 horas.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('36d38257-28e6-4273-a2a6-99c9d6c4e0b3', '0dd8e02c-8442-4076-856b-55e8a874a254', 'C) Tendo em vista que o pós-aquecimento, muitas das vezes, pode ser feito em temperaturas acima de 650 ºC, deve-se tomar muito cuidado para que não seja realizado um tratamento térmico de alívio de tensões na região da junta soldada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fbd7ec1-c80f-4df0-9d9f-5b0902ace7ed', '0dd8e02c-8442-4076-856b-55e8a874a254', 'D) Uma recomendação prática, adotada por todas as normas técnicas aplicáveis, estabelece que, toda vez que um pré-aquecimento tiver de ser realizado em junta, soldada, um pós-aquecimento também deve ser feito para eliminar a possibilidade do aparecimento de trinca a frio.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ca12feba-e8d2-40c7-a779-646096cde65c', '0dd8e02c-8442-4076-856b-55e8a874a254', 'E) O principal objetivo do pós-aquecimento é aumentar a difusão do hidrogênio encontrado na junta soldada.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d106c0bd-cd15-44f5-8c99-03c510245eb4', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 800', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4ceefcdd-5e17-43d6-b364-b3812ca7af86', '98b9e862-374e-4a44-aaf0-8def86783032', 'd106c0bd-cd15-44f5-8c99-03c510245eb4', 'multiple_choice', 'Pa), é solicitada a realização de mais de um Tratamento Térmico de Alívio de Tensões após a soldagem, visto que a realização deste confere àquela região uma maior tenacidade. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('da4f648a-d4c2-4490-805e-4d00d90e1f93', '4ceefcdd-5e17-43d6-b364-b3812ca7af86', 'D) Para a realização deste tratamento, não é estabelecida uma maneira específica para o aquecimento e o resfriamento da peça. A temperatura máxima do tratamento é a única variável a ser, efetivamente, levada em consideração.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e9e6215-3542-46f4-b29d-6027a569d3d1', '4ceefcdd-5e17-43d6-b364-b3812ca7af86', 'E) Tendo em vista que este tratamento, mesmo que bem executado, permite a obtenção de martensita na ZTA, é recomendada a realização de um revenimento logo após o término do primeiro tratamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d34239b1-ad47-4ab9-8c23-e45a513111f1', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 0', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bdd3fb0e-0442-47ab-93eb-3352eeb49d09', '98b9e862-374e-4a44-aaf0-8def86783032', 'd34239b1-ad47-4ab9-8c23-e45a513111f1', 'multiple_choice', '10%C apresentem baixa susceptibilidade à formação de trincas, é fundamental que os eletrodos revestidos básicos sejam ressecados e armazenados após ressecagem, conforme instruções do seu fabricante. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c46871ea-3283-4017-8fff-a8003e09976e', 'bdd3fb0e-0442-47ab-93eb-3352eeb49d09', 'D) Aços carbono, contendo teores de C próximos a 0,10%, com espessuras superiores a 2” nunca necessitam sofrer um tratamento térmico após soldagem.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83341d6f-14f9-4f60-9476-c969d06c7474', 'bdd3fb0e-0442-47ab-93eb-3352eeb49d09', 'E) Para a soldagem de aços com espessuras superiores a 25 mm, muitas vezes é recomendada a realização de pré-aquecimento, de controle de temperatura interpasse, assim como de tratamento térmico após soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('709df2e2-d7ff-43db-83fe-d8c63642106d', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c5ecd083-6930-4c66-90d3-4fb5de0f691c', '98b9e862-374e-4a44-aaf0-8def86783032', '709df2e2-d7ff-43db-83fe-d8c63642106d', 'multiple_choice', '1 \n\n<img src="/images/questions/page151_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c009a9bd-9712-4ff8-a767-ea67192ac6b9', 'c5ecd083-6930-4c66-90d3-4fb5de0f691c', 'A) As consequências causadas pela presença de descontinuidades do tipo “Abertura de Arco” serão tão piores, quanto maior o teor de elementos de liga na composição química do aço que está sendo soldado.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58c1b257-b3f1-4b91-b2c1-ec79cc83636d', 'c5ecd083-6930-4c66-90d3-4fb5de0f691c', 'B) Na soldagem de materiais metálicos com pequenas espessuras, cuidados especiais devem ser tomados quanto à sequência de passes, objetivando diminuir o nível de empeno da obra.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8fabc59-975e-420c-985d-0d5218453cd7', 'c5ecd083-6930-4c66-90d3-4fb5de0f691c', 'C) Tendo em vista que as trincas do tipo “interlamelar” são causadas pela presença de grande quantidade de hidrogênio na solda, é recomendado que haja um maior rigor na execução da ressecagem dos eletrodos revestidos básicos que serão usados na soldagem da junta.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('587bf15f-28cb-4e2c-8125-c63e811491be', 'c5ecd083-6930-4c66-90d3-4fb5de0f691c', 'D) É recomendável o emprego de processos de soldagem com alta energia de soldagem na soldagem de aços com elevados teores de C e Mn, objetivando diminuir o teor de hidrogênio difusível na solda.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c0bab0c-00f3-4206-b0aa-7f94f40cd9eb', 'c5ecd083-6930-4c66-90d3-4fb5de0f691c', 'E) Não é necessário fazer um pré-aquecimento para realizar a goivagem a arco de uma determinada região de uma peça.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7bb6d167-b6aa-4d62-a427-a99a151f1884', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 27', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c9511858-47e9-46b6-899b-5282126d24a6', '98b9e862-374e-4a44-aaf0-8def86783032', '7bb6d167-b6aa-4d62-a427-a99a151f1884', 'multiple_choice', 'Calcule o valor de Diluição da junta soldada mostrada a seguir. Informa-se que o valor da área do Metal Depositado é igual a 30 mm2. Dimensões em mm. \n\n<img src="/images/questions/page151_img1.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a9256a48-746e-4cd3-ada7-819ba70a51f8', 'c9511858-47e9-46b6-899b-5282126d24a6', 'A) 60 mm2', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('066d3dfc-ecac-409f-b194-78c9011734e5', 'c9511858-47e9-46b6-899b-5282126d24a6', 'B) 60 %', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e4a7ca57-e58d-4b85-bfb7-f813285df005', 'c9511858-47e9-46b6-899b-5282126d24a6', 'C) 40 %', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('307c842e-5661-440c-bc0f-215e4344d996', 'c9511858-47e9-46b6-899b-5282126d24a6', 'D) 40 mm2', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('40cd95e8-2d5f-4815-a71b-3f959f2f747f', 'c9511858-47e9-46b6-899b-5282126d24a6', 'E) 50 g', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('264f1660-0184-4e7e-9ddd-e9ec58fa8718', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 1', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('622190f7-9848-42e6-a32c-0bc0ed180f89', '98b9e862-374e-4a44-aaf0-8def86783032', '264f1660-0184-4e7e-9ddd-e9ec58fa8718', 'multiple_choice', '2 \n\n<img src="/images/questions/page152_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6e51cc2b-9e54-491f-ab1c-f19aad3f33d1', '622190f7-9848-42e6-a32c-0bc0ed180f89', 'A) 100ºC – 700ºC', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('922210f2-5ec6-4afa-a876-7c5b67cf8df5', '622190f7-9848-42e6-a32c-0bc0ed180f89', 'B) 500ºC – 1600ºC', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ea1434f4-920a-478d-8d3c-2e59c40cc084', '622190f7-9848-42e6-a32c-0bc0ed180f89', 'C) 700ºC – 1500ºC', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a9a453e9-5ced-4a68-970f-c2724bbe9475', '622190f7-9848-42e6-a32c-0bc0ed180f89', 'D) 500ºC – 1500ºC', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2da4aa28-1ac1-4621-bdf1-45d77251b1c2', '622190f7-9848-42e6-a32c-0bc0ed180f89', 'E) 700ºC – 1300ºC', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('32e4ea57-db40-4552-aae8-82eda606d5c6', '98b9e862-374e-4a44-aaf0-8def86783032', 'activity', 'Questão 30', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c1e806b4-5b74-42df-8c03-2282ca502bef', '98b9e862-374e-4a44-aaf0-8def86783032', '32e4ea57-db40-4552-aae8-82eda606d5c6', 'multiple_choice', 'Analisando metalurgicamente a microestrutura denominada “Martensita”, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f6a98983-f787-4e69-b7d1-85273e4edce2', 'c1e806b4-5b74-42df-8c03-2282ca502bef', 'A) Cristaliza-se no sistema Cúbico de Face Centrada.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b273dcee-3ec2-418c-a7c7-b55a06f8fc40', 'c1e806b4-5b74-42df-8c03-2282ca502bef', 'B) É produzida quando um material com microestrutura austenítica se resfria rapidamente.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c29786e-a9b5-485e-a9f1-6d257d74bac1', 'c1e806b4-5b74-42df-8c03-2282ca502bef', 'C) É uma fase supersaturada de carbono.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d841d6d-d528-4e1a-8f70-b2539ecb3149', 'c1e806b4-5b74-42df-8c03-2282ca502bef', 'D) Apresenta dureza muito elevada.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c2e3778-f1af-4ecf-a0c2-e027aaa023b5', 'c1e806b4-5b74-42df-8c03-2282ca502bef', 'E) Apresenta grande fragilidade.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('47dd874b-b45f-4cc1-a34d-c12642cab773', 'c5555555-5555-5555-5555-555555555555', 'Terminologia', 'Questões e atividades sobre Terminologia', 10, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('d7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '47dd874b-b45f-4cc1-a34d-c12642cab773', 'Prática - Terminologia', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('085c16de-dca7-4661-8f27-4c405b076bcb', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 2', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6336cdb9-8fed-47b7-b190-848a8dacbad6', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '085c16de-dca7-4661-8f27-4c405b076bcb', 'multiple_choice', 'Analisando a junta de ângulo (solda em ângulo convexa) mostrada a seguir, pode-se observar vários tipos de gargantas de solda. Marque a alternativa  que indique a seguinte sequência: Garganta Teórica, Garganta Efetiva e Garganta Real. \n\n<img src="/images/questions/page6_img1.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d02befc5-f59b-49a1-bf7f-8d356f626c3f', '6336cdb9-8fed-47b7-b190-848a8dacbad6', 'A) 1- Garganta Teórica;  2- Garganta Efetiva;  5- Garganta Real.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a8763d3e-05ab-4028-9b3e-43741586d386', '6336cdb9-8fed-47b7-b190-848a8dacbad6', 'B) 2- Garganta Teórica;  4- Garganta Efetiva;  5- Garganta Real.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('61c15715-e7ba-4b6d-9975-01b63d60c7d0', '6336cdb9-8fed-47b7-b190-848a8dacbad6', 'C) 1- Garganta Efetiva;  2- Garganta Real;  3- Garganta Teórica.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('91fb7b8a-96b8-4ef0-848f-1094a9a41269', '6336cdb9-8fed-47b7-b190-848a8dacbad6', 'D) 1- Garganta Efetiva;  2- Garganta Teórica;  4- Garganta Real.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7624d05b-ed06-47ae-b3f1-2a7a74742fec', '6336cdb9-8fed-47b7-b190-848a8dacbad6', 'E) 1- Garganta Teórica; 3- Garganta Efetiva;  4- Garganta Real', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('ccb4e126-f374-43b6-af4c-256061f45e84', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 3', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('96e7c287-94f0-410e-bb3d-e565a24535e6', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'ccb4e126-f374-43b6-af4c-256061f45e84', 'multiple_choice', 'Das descontinuidades apresentadas abaixo, indique aquela que nunca pode ser encontrada na raiz da solda: \n\n<img src="/images/questions/page6_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('01762d46-7c25-4cf6-aa14-d3f9344fb394', '96e7c287-94f0-410e-bb3d-e565a24535e6', 'A) Sobreposição;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e47c7ba-7d6b-4c31-b89e-26e0ed81853e', '96e7c287-94f0-410e-bb3d-e565a24535e6', 'B) Trinca;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4ee6084b-31fb-4bf7-93eb-39430149f7fc', '96e7c287-94f0-410e-bb3d-e565a24535e6', 'C) Falta de fusão;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('421f9564-0a0b-4da5-a127-1c886167cbd7', '96e7c287-94f0-410e-bb3d-e565a24535e6', 'D) Falta de penetração; 7', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a926a1a1-38fd-4aea-bcd2-e03399659dbb', '96e7c287-94f0-410e-bb3d-e565a24535e6', 'E) Penetração excessiva;', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5dc6d2bd-8605-40b7-9802-827676af6481', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 4', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('10334bb7-d4ee-441a-9034-ade0304840ab', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '5dc6d2bd-8605-40b7-9802-827676af6481', 'multiple_choice', 'Das descontinuidades apresentadas abaixo, marque aquela que só é encontrada em juntas de topo. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f2a9a747-f5c5-4b29-86d7-cf9589e94c08', '10334bb7-d4ee-441a-9034-ade0304840ab', 'A) Convexidade excessiva;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b44b8e63-ecdd-4449-9fdd-4b989bdc4678', '10334bb7-d4ee-441a-9034-ade0304840ab', 'B) Desalinhamento;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a3fe023d-8347-446c-a084-e49a87d0d3ce', '10334bb7-d4ee-441a-9034-ade0304840ab', 'C) Deformação angular;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67dc16b6-3f4c-43a5-bd46-f66b6074bc51', '10334bb7-d4ee-441a-9034-ade0304840ab', 'D) Solda em ângulo assimétrica;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('72c0657c-5999-469d-9aa9-303bdf087043', '10334bb7-d4ee-441a-9034-ade0304840ab', 'E) Concavidade excessiva.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('629078b7-8d9a-4cd6-8003-b9ebb0756429', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 5', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('57fe64a3-f711-44bd-99e0-67136cf13079', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '629078b7-8d9a-4cd6-8003-b9ebb0756429', 'multiple_choice', 'Dos tipos de juntas apresentadas abaixo, assinale aquela que não está associada  a uma solda de ângulo. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('17e6a85e-a821-486f-86c7-8030f02bbde5', '57fe64a3-f711-44bd-99e0-67136cf13079', 'A) Junta em quina;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('183068c3-6cf3-4029-b20a-350db97c0ee1', '57fe64a3-f711-44bd-99e0-67136cf13079', 'B) Junto de ângulo em T;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('03d908f8-7d58-4fce-b9e2-95fe9ce45e88', '57fe64a3-f711-44bd-99e0-67136cf13079', 'C) Junta em L;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee3c39ba-d074-4848-bbec-74b5a54e7b13', '57fe64a3-f711-44bd-99e0-67136cf13079', 'D) Junta sobreposta;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('398e2718-4c68-450b-9f0e-0b8d3d4cd3fb', '57fe64a3-f711-44bd-99e0-67136cf13079', 'E) Junta de aresta.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4ef922c2-70cb-44da-b149-c6488824f7b2', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 6', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '4ef922c2-70cb-44da-b149-c6488824f7b2', 'multiple_choice', 'Dos diferentes tipos de juntas formadas entre os componentes a serem soldados, marque a definição correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('61b81a82-0842-49a4-904c-211d635d2bbf', '11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'A) Junta de aresta: junta formada por dois componentes a soldar, de tal maneira que suas superfícies sobrepõem-se.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eeacc023-ad12-4f65-af3b-08a3743e144d', '11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'B) Junta de Ângulo: junta em que, numa seção transversal, os componentes a soldar apresentam-se sob forma de um ângulo;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('493e41b8-ffb9-4768-82ad-9938da4c0c95', '11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'C) Junta Dissimilar: junta soldada, cuja composição química do metal de base dos componentes não difere significativamente entre si;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a11bb72-a299-4e4d-bb32-a2ddce63f838', '11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'D) Junta Sobreposta: Junta entre as extremidades de dois ou mais membros paralelos ou parcialmente paralelos;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e89501a-041c-46ad-b6a4-2294298bc867', '11f75e72-d7ec-45fa-a436-c9ceb8fde337', 'E) Junta de Topo: junta entre dois ou mais membros, devendo todos eles se encontrarem no mesmo plano. 8', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0793f714-2c76-4e54-a5fd-0889725fdecb', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 9', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '0793f714-2c76-4e54-a5fd-0889725fdecb', 'multiple_choice', 'Qual o único tipo de trinca que não pode ser encontrada na ZTA (zona termicamente afetada) de uma junta soldada. \n\n<img src="/images/questions/page9_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('623f314e-becb-4acb-bb4b-11a796ca9190', '8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'A) Trinca de cratera;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a1c7e470-d8b8-4b1a-8b90-1e259a4fefb8', '8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'B) Trinca na margem;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('222209f1-e52a-4287-b905-151db4b56974', '8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'C) Trinca sob cordão;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be7a17d8-f553-4543-931c-90f23b0c0b95', '8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'D) Trinca ramificada;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('539bc3e3-0aa8-4bde-8f31-3ab6d177fd7f', '8cc2f85c-47ff-412c-9416-4250ca0f19d5', 'E) Trinca na raiz.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('040fa625-0aa7-447c-b24a-f0a02156c165', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 10', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('325b23f1-e8ad-49c6-a116-e39002e536aa', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '040fa625-0aa7-447c-b24a-f0a02156c165', 'multiple_choice', 'Dos diferentes tipos de trinca, assinale qual delas só pode ser localizada no metal de base. \n\n<img src="/images/questions/page9_img1.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('aaacd2e9-b56c-4349-8d7c-489b1014af88', '325b23f1-e8ad-49c6-a116-e39002e536aa', 'A) Trinca irradiante;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('82302c2a-9eac-4b15-b011-c8020fd440b5', '325b23f1-e8ad-49c6-a116-e39002e536aa', 'B) Trinca de cratera;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('387072eb-5ab0-4efc-82b7-00113d0b6cbd', '325b23f1-e8ad-49c6-a116-e39002e536aa', 'C) Trinca longitudinal; 10', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('551af404-d6e7-4cd2-a35d-4990da026922', '325b23f1-e8ad-49c6-a116-e39002e536aa', 'D) Trinca estrela;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('487bc9f7-0fa4-418c-a5b6-4d47fb2a4a0b', '325b23f1-e8ad-49c6-a116-e39002e536aa', 'E) Trinca interlamelar.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('6b77e801-ef06-4c58-a09a-d41b7fb44b7a', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 11', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('50531597-3dfa-4508-b65e-3bc896433ad2', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '6b77e801-ef06-4c58-a09a-d41b7fb44b7a', 'multiple_choice', 'Em relação ao conceito de defeitos e descontinuidades, assinale a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0ac0505-5f84-4968-bec5-9a9f2787061e', '50531597-3dfa-4508-b65e-3bc896433ad2', 'A) Nem toda descontinuidade pode ser considerada um defeito;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5a192dc3-1728-4b6b-9405-ea6c809e04e8', '50531597-3dfa-4508-b65e-3bc896433ad2', 'B) Cada norma técnica estabelece seus próprios critérios de aceitação em relação a uma determinada descontinuidade;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5aa321e4-ee6e-4cf3-a2d6-4bf59992cd0b', '50531597-3dfa-4508-b65e-3bc896433ad2', 'C) Descontinuidade é a interrupção das estruturas típicas de uma peça no que ser refere à homogeneidade de características metalúrgicas, mecânicas e físicas;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3092950d-2230-4076-abb8-d84231efb47a', '50531597-3dfa-4508-b65e-3bc896433ad2', 'D) Ao se deparar com uma determinada descontinuidade na região da junta soldada, o Inspetor de Soldagem necessita solicitar imediatamente o seu reparo;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e7fa78c2-1ba8-4fdb-befe-a1869dc9efca', '50531597-3dfa-4508-b65e-3bc896433ad2', 'E) A descontinuidade só deve ser considerada defeito quando, por sua natureza, dimensão ou efeito acumulativo, tornar a peça inaceitável por não satisfazer os requisitos mínimos da norma técnica aplicável.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c5f40106-25e1-4893-9ef5-4b97d5332921', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 12', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'c5f40106-25e1-4893-9ef5-4b97d5332921', 'multiple_choice', 'Das definições apresentadas abaixo, relativas às descontinuidade encontradas na região de juntas soldadas, assinale a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b29d752-9c90-491a-8f25-f440dd4a60de', 'd335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'A) Deformação angular: distorção angular em relação à configuração de projeto, típica das juntas de ângulo.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4cac5075-0124-4455-b6e5-25cfacdb2de1', 'd335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'B) Mordedura: reentrância na raiz da solda, podendo se localizar na parte central (situada ao longo do centro do cordão) e lateral (situada nas laterais do cordão);', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b3a0998-703c-423e-a286-8c583da9c2ec', 'd335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'C) Poro: vazio isolado, não arredondado com a maior dimensão paralela ao eixo da solda;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c0c3258-c616-4302-ac03-d50292d4bc7d', 'd335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'D) Deposição insuficiente: solda em ângulo cujas pernas são significativamente desiguais em desacordo com a configuração de projeto;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fd0d69f2-3f25-4027-b6dc-59691514c211', 'd335ad6b-4e3d-4f5b-b937-b716701cd5cd', 'E) Reforço excessivo: excesso de metal da zona fundida sobreposto ao metal de base, na margem da solda, sem estar fundido ao metal de base. 11', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0d3af045-923d-4faa-bc85-e4e261f40632', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 13', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '0d3af045-923d-4faa-bc85-e4e261f40632', 'multiple_choice', 'Em relação aos diferentes tipos de consumíveis de soldagem, assinale a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5a8069ea-8afd-49cb-8b3c-c5b221cdd07d', '739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'A) Vareta de solda: tipo de metal de adição utilizado para soldagem ou brasagem, sobre o qual é aplicado um revestimento do tipo “neutro”;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46c94f2b-c43c-4907-9725-43ad05883cc0', '739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'B) Eletrodo nu: metal de adição consistindo de um metal não ligado (puro), produzido apenas sob a forma de arame;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('09682cd3-31b8-4707-9a6d-4fa696abd629', '739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'C) Eletrodo revestido: consumível consistindo de uma alma de eletrodo, sobre a qual um revestimento é aplicado. Este revestimento tem apenas duas funções: formar uma atmosfera protetora e abrir o arco elétrico;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5f48fb60-c731-44b7-8bbb-156cfd0ab26f', '739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'D) Eletrodo tubular: (também chamado de Arame Tubular) é um metal de adição consistindo de um tubo metálico oco, cujo uso de um gás de proteção externo é essencial para a sua aplicação;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5cda0837-5b28-4907-a3e1-021bbb05730c', '739d36e2-7726-47c9-a8a9-9a7c3f5e3ded', 'E) Fluxo: composto mineral granular, cujo objetivo é proteger a poça de fusão, purificar a zona fundida, modificar a composição química do metal de solda, influenciando suas propriedades mecânicas.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('edae4cb1-7fef-49a4-829b-87ecb35ba151', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 14', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e52219df-4fe3-441e-905b-203a4d25878c', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'edae4cb1-7fef-49a4-829b-87ecb35ba151', 'multiple_choice', 'Das alternativas apresentadas abaixo, assinale a resposta correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fde052c1-851b-476d-bc3e-01885a1472a2', 'e52219df-4fe3-441e-905b-203a4d25878c', 'A) Eficiência de Deposição: é a relação entre o peso do consumível de soldagem e o peso do metal depositado, expressa em %/g;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8963b5e8-f2dc-4bd0-b3c3-fa45083f78e4', 'e52219df-4fe3-441e-905b-203a4d25878c', 'B) Taxa de Deposição: é o peso do consumível utilizado durante a soldagem por unidade de tempo;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3e2a5499-101b-4b32-ad6a-e61bc27359a8', 'e52219df-4fe3-441e-905b-203a4d25878c', 'C) ;Eficiência de Junta: é a relação entre o valor da resistência do metal depositado e a resistência do metal de solda, expressa em %;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f4100c6d-9675-4c42-977b-2a0617f8360f', 'e52219df-4fe3-441e-905b-203a4d25878c', 'D) Velocidade de Avanço: é a velocidade da poça de fusão durante a soldagem;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a89f5851-4729-40ec-8cb6-6d1cefbdb105', 'e52219df-4fe3-441e-905b-203a4d25878c', 'E) Velocidade de Alimentação de Arame: é medida levando em consideração o peso do arame consumido em um determinado tempo, expressa em (kg/h).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4a69f64f-fe96-4f87-afe2-af3b1e05c21c', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 15', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('95d77532-924e-424e-8d55-0b8ac964876b', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '4a69f64f-fe96-4f87-afe2-af3b1e05c21c', 'multiple_choice', 'Das alternativas apresentadas abaixo, assinale a resposta incorreta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3a3a7179-be53-4db2-9bcd-53755b1eb436', '95d77532-924e-424e-8d55-0b8ac964876b', 'A) Metal de Base: metal puro ou liga metálica a ser soldada, cortada ou brasada;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e6ed8ff7-5bfa-4375-b5e2-12934280b73b', '95d77532-924e-424e-8d55-0b8ac964876b', 'B) Metal de Solda: porção do metal de base que foi fundido durante a soldagem; 12', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4c89c3d7-b052-4476-899e-6e93c7d295b1', '95d77532-924e-424e-8d55-0b8ac964876b', 'C) Metal Depositado: metal de adição que foi depositado durante a operação de soldagem;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f0231563-b23f-4540-a545-67c098c14c92', '95d77532-924e-424e-8d55-0b8ac964876b', 'D) Metal de Adição: metal puro ou liga metálica a ser adicionada para a fabricação de uma junta soldada ou brasada;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e1dfcadd-52e3-46ba-a614-3160b2c4ed1a', '95d77532-924e-424e-8d55-0b8ac964876b', 'E) Metal de Solda: porção da junta soldada que foi completamente fundida durante a soldagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3b131044-a957-46cd-b9ca-420be4f50bce', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 16', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a05ae58b-3850-4f42-86ef-5200449f9781', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '3b131044-a957-46cd-b9ca-420be4f50bce', 'multiple_choice', 'Quanto ao furo usado em uma solda do tipo Tampão, cuja função é permitir que duas chapas sobrepostas ou em forma de “T” possam ser soldadas, marque a alternativa incorreta. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a750c1a0-163d-409f-b97e-43f44ad1e470', 'a05ae58b-3850-4f42-86ef-5200449f9781', 'A) As paredes do furo podem ser paralelas ou não;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3203bc98-56ad-45f3-864f-7f93bcab33d3', 'a05ae58b-3850-4f42-86ef-5200449f9781', 'B) O furo pode ser parcialmente ou totalmente preenchido por solda;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8c0abf7f-e42f-4c11-83e4-860fe0d9b791', 'a05ae58b-3850-4f42-86ef-5200449f9781', 'C) O furo tem que ser totalmente preenchido por solda;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('137a882e-4997-4ea5-9968-a526690b81a9', 'a05ae58b-3850-4f42-86ef-5200449f9781', 'D) O furo pode ser do tipo “circular”;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f709de36-21db-46cc-a2d6-0da38e30d7a9', 'a05ae58b-3850-4f42-86ef-5200449f9781', 'E) O furo pode ser do tipo “alongado”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('16487b5e-f632-4ccb-96e6-b06924a7ef2f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 17', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '16487b5e-f632-4ccb-96e6-b06924a7ef2f', 'multiple_choice', 'Das alternativas apresentadas abaixo, assinale a resposta correta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('58c7e495-c7d8-4d5c-994e-7b8ee48a9910', 'a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'A) Solda Autógena: solda produzida por fusão, quando se faz necessária a aplicação de pressão diretamente na junta durante a soldagem;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('03b36541-a44e-4038-bd9b-1d965e97f4f8', 'a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'B) Solda de Topo: solda executada em uma junta de topo, à exceção daquelas juntas que apresentam chanfros que necessitam ser confeccionados por usinagem, a saber: chanfro em “J”, em “Duplo J”, em “U”, e em “Duplo U”;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ed7ef1b7-b007-49b7-ac29-42e0452c1d21', 'a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'C) Solda de Selagem: solda executada exclusivamente em junta de topo, cuja sanidade deve ser avaliada por ensaio radiográfico ou ultra-som;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('eac324f6-9425-4193-8969-2c92a4627a40', 'a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'D) Solda em Ângulo: solda de seção transversal aproximadamente triangular que une duas superfícies em ângulo, em uma junta em “T”, em junta em quina e em uma junta sobreposta;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8b2a6755-34f8-4576-addc-93cbe4cd6dff', 'a2f563fa-c905-41e2-b3b2-17d68fa48f34', 'E) Solda de Aresta: solda executada em uma junta sobreposta;', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e4458eab-73d9-430c-82e0-5f3f685af9ef', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 18', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('00fb211d-1faa-446f-aff3-b388f2e7472f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'e4458eab-73d9-430c-82e0-5f3f685af9ef', 'multiple_choice', 'Das alternativas apresentadas abaixo, assinale a resposta correta. 13 ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2633adb-75e5-4eff-ad75-390f03889089', '00fb211d-1faa-446f-aff3-b388f2e7472f', 'A) Solda Heterogênea: Solda cuja composição química da zona fundida difere significativamente da do(s) metal(is) de base, no que se refere aos elementos de liga;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6b8321b2-40b0-420f-9f87-776955e94dc1', '00fb211d-1faa-446f-aff3-b388f2e7472f', 'B) Solda Autógena: solda produzida unicamente pelo calor gerado por um arco elétrico, não sendo necessária a aplicação de pressão diretamente na junta durante a soldagem;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3b15322b-284e-47c4-ad6f-b57e160bf183', '00fb211d-1faa-446f-aff3-b388f2e7472f', 'C) Solda Homogênea: solda cuja composição química da Zona Termicamente Afetada é muito próxima a do metal de base ;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('97f0da68-21bc-4527-a525-9d7d5e81d241', '00fb211d-1faa-446f-aff3-b388f2e7472f', 'D) Solda Provisória: também chamada de “Amanteigamento”, tem a finalidade de fazer uma ponte metalúrgica na soldagem de diferentes metais de base;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('46e6d180-a423-4ccd-9a3a-d48424ec8024', '00fb211d-1faa-446f-aff3-b388f2e7472f', 'E) Soldagem: processo utilizado para unir apenas materiais metálicos por meio de solda, como também pela técnica de brasagem.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('27aec10a-5852-4665-a647-b491658e60a7', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 19', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '27aec10a-5852-4665-a647-b491658e60a7', 'multiple_choice', '.Quanto à definição do termo “Solda de Costura”, marque a alternativa incorreta. \n\n<img src="/images/questions/page13_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30c2c796-6b0a-416d-b979-1b8df083ec5a', '71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'A) É uma solda contínua executada em cima de membros sobrepostos;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1a6115c4-0073-4911-9aae-9b210390a54f', '71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'B) É uma solda contínua executada entre membros sobrepostos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e33568d2-b7be-4597-9c33-c2ff720df1ca', '71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'C) A solda pode ser realizada pelo processo manual com eletrodo revestido;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ff9e4ebb-b693-4523-815f-8aa4f674db28', '71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'D) A solda pode ser realizada pelo processo GMAW (MIG/MAG);', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b337297-4463-4de3-b28d-7952faccd0d5', '71009061-5ad9-4ef4-9f2b-0c9a19db5efd', 'E) A solda pode ser realizada pelo processo por pontos (resistência elétrica).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('adce7dfc-bf9e-4c23-aee7-0ee4ded04eb1', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 20', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'adce7dfc-bf9e-4c23-aee7-0ee4ded04eb1', 'multiple_choice', 'No croqui da junta de topo abaixo, indique qual dos números apresentados representa a definição de “Dimensão da solda em chanfro”. \n\n<img src="/images/questions/page13_img1.png" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1440d468-355d-4b2e-9241-38ab8e0560f8', 'ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'A) 1;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0e4df64e-6a10-40af-a70e-a99bf222a5f3', 'ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'B) 2; 14', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06c62dee-1efa-423d-9d8b-a06fb13be9dd', 'ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'C) 3;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('93bdaeae-c658-491a-b395-4e0f1e15e1aa', 'ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'D) 4;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('14180273-5cea-4693-9130-ccfa670272fe', 'ec83c7f7-a972-44a9-9c18-e3690b3138bb', 'E) 5.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8c4819b5-6eef-4711-a6b6-9303b4d95d33', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 21', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('42500f04-86d4-455f-893b-f441b086467f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '8c4819b5-6eef-4711-a6b6-9303b4d95d33', 'multiple_choice', 'Analisando os diferentes tipos de zonas existentes em uma junta soldada, assinale a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b6d78dc-95ee-4288-b53d-fc67ab0d2f8c', '42500f04-86d4-455f-893b-f441b086467f', 'A) A região correspondente à Zona Fundida está inscrita dentro do metal depositado;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4ee0d02e-7fd1-45e5-9e7d-060ea645c2a6', '42500f04-86d4-455f-893b-f441b086467f', 'B) A Zona de Ligação separa a Zona Fundida da Zona Termicamente Afetada;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5302d237-8857-4241-99d4-b9619aa69835', '42500f04-86d4-455f-893b-f441b086467f', 'C) Pode-se afirmar que a Zona Termicamente Afetada e a Zona de Fusão são as mesmas regiões;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('68a5e4e0-68d7-45eb-b3ba-633b4e92c5e4', '42500f04-86d4-455f-893b-f441b086467f', 'D) Apesar da região da Zona Termicamente Afetada se localizar no metal de base, pode-se afirmar que a sua composição foi significativamente modificada pelas altas temperaturas do arco elétrico;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b593bd6c-72dc-47eb-8f0b-afb8861d0375', '42500f04-86d4-455f-893b-f441b086467f', 'E) A microestrutura encontrada na ZTA é a mesma do que aquela encontrada no metal de base.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d7b82e85-f942-4333-a855-f83670b15951', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 22', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b3485af2-5b47-48ef-8469-c436d291a420', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'd7b82e85-f942-4333-a855-f83670b15951', 'multiple_choice', 'Dos diferentes tipos de “Faces” existentes na soldagem, indique a alternativa correta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('21ed617e-bed5-4bbc-8d10-1b95878c61a2', 'b3485af2-5b47-48ef-8469-c436d291a420', 'A) Face do chanfro: parte da face do chanfro adjacente à raiz da junta;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('49be452b-17fd-4ab9-9d70-c5e7b432478a', 'b3485af2-5b47-48ef-8469-c436d291a420', 'B) Face da Solda: superfície exposta da solda, pelo lado oposto por onde a solda foi executada.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5612e7cf-33d2-4bd9-b349-c20576ae0df6', 'b3485af2-5b47-48ef-8469-c436d291a420', 'C) Face de Fusão: superfície de um componente localizado no interior do chanfro;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('04073de1-a235-41f7-ac4d-6f86a319cfd3', 'b3485af2-5b47-48ef-8469-c436d291a420', 'D) Face da Raiz: porção da junta a ser soldada onde os membros estão o mais próximo possível entre si;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('47caf438-49d6-457c-8b9d-029f12ff28e5', 'b3485af2-5b47-48ef-8469-c436d291a420', 'E) Face da Solda: superfície exposta da solda, pelo lado por onde a solda foi executada.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f0a66110-1b22-4a51-a785-3c8733ec7b4f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 23', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('fcfa1a1a-b02f-4775-94bc-40eca587e791', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'f0a66110-1b22-4a51-a785-3c8733ec7b4f', 'multiple_choice', 'Das definições para os termos “Soldagem Manual, Soldagem Semi- automática e Soldagem Automática”, assinale a alternativa incorreta. 15 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f09b8536-8465-4c5f-b7a2-30da712e8bc6', 'fcfa1a1a-b02f-4775-94bc-40eca587e791', 'A) Soldagem Manual: processo no qual toda a operação é executada e controlada manualmente;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1e530f9c-021e-47d8-8d15-034949aafa9b', 'fcfa1a1a-b02f-4775-94bc-40eca587e791', 'B) Soldagem Semi-automática: soldagem a arco com equipamento que controla somente o avanço do metal de adição. O avanço da soldagem é controlado manualmente;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6103cbe8-2314-4e5d-91c6-f1c2bb564e5c', 'fcfa1a1a-b02f-4775-94bc-40eca587e791', 'C) Soldagem Automática: processo no qual toda a operação é executada e controlada automaticamente sem a interveniência do operador;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('559a00c6-2353-40d5-a5f5-bc61a2e6809d', 'fcfa1a1a-b02f-4775-94bc-40eca587e791', 'D) Pode-se afirmar que o processo TIG Mecanizado é um exemplo de soldagem manual e que os processos GMAW (MIG/MAG) e FCAW (Arame tubular) são exemplos de soldagem semi-automática;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('878eafb5-54ca-465a-a370-3ee154c3ca99', 'fcfa1a1a-b02f-4775-94bc-40eca587e791', 'E) A Soldagem Manual e a Soldagem Semi-automática são executadas por “Soldadores”, enquanto a Soldagem Automática é executada por “Operadores de Soldagem”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('799ff121-5a7b-4701-addb-ac54ecff3758', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 24', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4adff958-9ed0-44be-8c68-13212dc97207', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '799ff121-5a7b-4701-addb-ac54ecff3758', 'multiple_choice', 'Em relação aos 6 croquis apresentando diferentes tipos de juntas, indique qual alternativa está correta. I II III IV 16 V VI \n\n<img src="/images/questions/page15_img1.png" width="100%" />\n\n<img src="/images/questions/page15_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2d92b63c-649e-4398-9a9f-9461d79000cf', '4adff958-9ed0-44be-8c68-13212dc97207', 'A) As juntas I, III, IV e V são classificadas como “Juntas de Ângulo”;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c119358-1f84-455b-8081-626a068d71f5', '4adff958-9ed0-44be-8c68-13212dc97207', 'B) As juntas II e IV são denominadas, respectivamente, “Junta de Aresta” e “Junta Sobreposta”;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('596be85a-95c4-4413-bd83-64e381cb3458', '4adff958-9ed0-44be-8c68-13212dc97207', 'C) A juntas III e V são denominadas, respectivamente, “Junta em Quina” e “Junta em L”;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('50b20957-fbf8-4e42-a049-b8c17f0792d8', '4adff958-9ed0-44be-8c68-13212dc97207', 'D) A juntas I e VI são denominadas, respectivamente, “Junta de Ângulo em T” e “Junta de Ângulo em Ângulo”', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('61819d06-5709-4e64-b88a-90b59914d07a', '4adff958-9ed0-44be-8c68-13212dc97207', 'E) As juntas II e IV são classificadas como “Juntas de Topo”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('5cf59efa-bce3-4fa3-882b-0c07648fca72', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 25', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('59ea0509-aff6-4e04-b679-f59b0023f06c', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '5cf59efa-bce3-4fa3-882b-0c07648fca72', 'multiple_choice', 'Das definições dos termos “Passe de Revenimento”, “Camada”, “Passes” e “Dimensões”, analise o croqui abaixo e assinale a alternativa correta. \n\n<img src="/images/questions/page16_img1.png" width="100%" />\n\n<img src="/images/questions/page16_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('361a5f03-d444-489d-9ceb-b5d0dd07ecda', '59ea0509-aff6-4e04-b679-f59b0023f06c', 'A) Nº do passe de revenimento: 14 Nº de camadas: 6 Nº total de passes: 17 Dimensão do passe de raiz (mm): 47', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c801c0f-c9f9-43a4-8654-3643db799baf', '59ea0509-aff6-4e04-b679-f59b0023f06c', 'B) Nº do passe de revenimento: 18 Nº de camadas: 5 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,8 17', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e2e48148-2c99-4135-850a-b0b4ab70a654', '59ea0509-aff6-4e04-b679-f59b0023f06c', 'C) Nº do passe de revenimento: 18 Nº de camadas: 6 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,0', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9ac30c4c-a5f8-491d-97fa-cc1ad85a8f2d', '59ea0509-aff6-4e04-b679-f59b0023f06c', 'D) Nº do passe de revenimento: 14 Nº de camadas: 5 Nº total de passes: 17 Dimensão do passe de raiz (mm): 3,0', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0943dc6b-e320-4f6a-ace8-e91594eb7352', '59ea0509-aff6-4e04-b679-f59b0023f06c', 'E) Nº do passe de revenimento: 18 Nº de camadas: 6 Nº total de passes: 18 Dimensão do passe de raiz (mm): 3,8', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3e8a42f9-3eb8-4c90-8919-69ea125c60e9', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 26', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d3aacc0e-e93c-41be-8180-9d659061bbef', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '3e8a42f9-3eb8-4c90-8919-69ea125c60e9', 'multiple_choice', 'Analisando o croqui abaixo, identifique o tipo de solda apresentado. \n\n<img src="/images/questions/page17_img1.png" width="100%" />', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('91c50dfe-e918-4d5d-8244-9d937b0b4a31', 'd3aacc0e-e93c-41be-8180-9d659061bbef', 'A) Solda em escalão;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3c09b57a-608a-4c57-a8ac-0b2315a56514', 'd3aacc0e-e93c-41be-8180-9d659061bbef', 'B) Solda descontínua coincidente;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd72e455-1962-4c16-8740-12e5ba79821c', 'd3aacc0e-e93c-41be-8180-9d659061bbef', 'C) Solda em cadeia;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('755a1177-7491-489b-8fdb-7804a7fc8abd', 'd3aacc0e-e93c-41be-8180-9d659061bbef', 'D) Solda contínua intercalada;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8f78547b-bf07-4b71-a7aa-e1f7c9af4d32', 'd3aacc0e-e93c-41be-8180-9d659061bbef', 'E) Solda contínua coincidente.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4fbb077b-b216-4c7a-afc5-ab95539e4e2f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 27', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '4fbb077b-b216-4c7a-afc5-ab95539e4e2f', 'multiple_choice', 'Observando a junta apresentada no croqui a seguir, identifique os diferentes termos técnicos. 18 \n\n<img src="/images/questions/page17_img1.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8070468a-e357-42fc-bca8-3a1a02fda8e1', '5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'A) Abertura da raiz:  1 Face da raiz: 2 Ângulo do Bisel: 4 Ângulo do Chanfro: 5', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bc7c7d3f-4bf3-499c-ab41-c67426def039', '5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'B) Abertura da raiz: 1 Face da raiz: 2 Ângulo do Bisel: 3 Ângulo do Chanfro: 4', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9a85db7b-af34-4ff5-98d6-7e8f43ded2a9', '5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'C) Abertura da raiz: 2 Face da raiz: 1 Ângulo do Bisel: 5 Ângulo do Chanfro: 4', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('770aeab0-75ee-4fc5-a19b-8cdf497fa82a', '5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'D) Abertura da raiz: 2 Face da raiz: 5 Ângulo do Bisel: 3 Ângulo do Chanfro: 4', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d34155f-c76c-4c62-8924-f3ad9e170dd8', '5d1f690e-7b13-41e5-95aa-cb8f3a52955f', 'E) Abertura da raiz: 1 Face da raiz: 2 Ângulo do Bisel: 5 Ângulo do Chanfro: 3', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f0e0f846-5136-4787-9d5c-da23a8e8a1c5', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 28', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4c74e31c-e833-4d59-a44f-8b427eedcefb', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'f0e0f846-5136-4787-9d5c-da23a8e8a1c5', 'multiple_choice', 'Observando os diferentes tipos de trincas encontrados no croqui abaixo, marque qual trinca não está presente. \n\n<img src="/images/questions/page19_img1.png" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1aafb1e4-15f9-441a-920e-f48d8268bed4', '4c74e31c-e833-4d59-a44f-8b427eedcefb', 'A) Trinca longitudinal;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('623ffd2d-c897-4ce2-adc7-e78484e9db75', '4c74e31c-e833-4d59-a44f-8b427eedcefb', 'B) Trinca interlamelar;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('292e3da1-a966-4eae-985c-b37b1a61d34f', '4c74e31c-e833-4d59-a44f-8b427eedcefb', 'C) Trinca na raiz;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4acaad71-d2e6-4e42-828f-9650b90f6f61', '4c74e31c-e833-4d59-a44f-8b427eedcefb', 'D) Trinca ramificada', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('283adc18-7e3d-4c78-9156-69a6bff5000d', '4c74e31c-e833-4d59-a44f-8b427eedcefb', 'E) Trinca irradiante.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('07d836e9-0afa-4bf5-990c-662c29e664cb', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 29', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('29c754bd-fb3a-4721-8197-2aa7a3825317', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '07d836e9-0afa-4bf5-990c-662c29e664cb', 'multiple_choice', 'Analisando as definições dos termos “Passe de Solda”, “Passe Estreito”, “Passe Oscilante” e “Passe de Revenimento”, assinale a alternativa correta. \n\n<img src="/images/questions/page19_img1.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81ca616a-9fa4-4c5a-8eb4-37307566423f', '29c754bd-fb3a-4721-8197-2aa7a3825317', 'A) Passe de solda: produto da fusão de um consumível de soldagem. Desta forma, pode-se afirmar que um cordão de solda em uma junta soldada poderá ter mais de um passe de solda;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('04633a7a-d083-4df5-bbc5-2acde8b0def5', '29c754bd-fb3a-4721-8197-2aa7a3825317', 'B) Passe estreito: depósito efetuado seguindo o eixo da solda sem qualquer movimento lateral;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8093eb6-fea5-439b-a07d-9afad917d277', '29c754bd-fb3a-4721-8197-2aa7a3825317', 'C) Passe oscilante: depósito efetuado com movimento lateral (oscilação transversal) em relação ao eixo da solda; 20', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa2b3e4c-044d-46a4-8b26-48c222286e2d', '29c754bd-fb3a-4721-8197-2aa7a3825317', 'D) Passe de revenimento: é o passe empregado quando o aço, que está sendo soldado, sofreu um tratamento térmico do tipo “têmpera” durante a sua fabricação;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4301f5b9-dfcb-41d2-965b-53f42cb9521c', '29c754bd-fb3a-4721-8197-2aa7a3825317', 'E) Pelas definições de passe estreito e passe oscilante, pode-se concluir que o estreito introduz mais energia térmica na junta que está sendo soldada do que o segundo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('02a94686-7e6a-4008-be39-903cc2eae101', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 30', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '02a94686-7e6a-4008-be39-903cc2eae101', 'multiple_choice', 'Analisando os diferentes tipos de correntes e polaridades usados na soldagem a arco, marque a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5c63c478-dad4-4a12-8d08-44e93c92af6f', 'b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'A) Polaridade Direta: tipo de ligação para soldagem com corrente contínua, onde os elétrons deslocam-se do eletrodo para a peça;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('331b44c5-1c56-46ee-854a-cac118d43b07', 'b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'B) Polaridade Inversa: tipo de ligação para soldagem com corrente alternada, onde os elétrons deslocam-se da peça para o eletrodo;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5261da73-4032-476c-9f5c-9b95b5e393e3', 'b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'C) Polaridade Direta: tipo de ligação para soldagem com corrente alternada, onde os elétrons deslocam-se da peça para o eletrodo;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b3cdf305-b02f-4011-87db-a9eac3e2aef7', 'b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'D) Polaridade Inversa: tipo de ligação para soldagem com corrente contínua, onde os elétrons deslocam-se do eletrodo para a peça;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b8a08b38-c304-4b57-b9c2-415461ba4ead', 'b6246bba-4b46-47fc-aa0e-bff36f6ad74a', 'E) Polaridade Inversa: é a polaridade ideal a ser adotada na soldagem de aços, quando se emprega um transformador como fonte de energia.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e3c02130-ab02-4a21-ab7b-4ffe286acd9a', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 31', 'Resolva a questão', 28)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('356e7756-7c92-4b18-8704-68420a906794', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'e3c02130-ab02-4a21-ab7b-4ffe286acd9a', 'multiple_choice', 'Quanto às posições e progressões de soldagem, marque a definição incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a21c7c43-fe2a-4da5-b003-5e743314e4ad', '356e7756-7c92-4b18-8704-68420a906794', 'A) Posição Sobre-cabeça: posição na qual executa-se a soldagem pelo lado inferior da junta;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d609ca13-d75f-45da-9063-85468fc8c6b6', '356e7756-7c92-4b18-8704-68420a906794', 'B) Posição Vertical, progressão Ascendente: posição na qual o eixo da solda encontra-se aproximadamente no plano vertical, sendo a solda executada no sentido: inferior - superior;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b3843eec-8e5e-4819-a049-c53da268d103', '356e7756-7c92-4b18-8704-68420a906794', 'C) Posição Horizontal: posição na qual o eixo da solda está em um plan aproximadamente horizontal e a face da solda está em um plano aproximadamente vertical;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f5aa4e82-7dbf-43f7-ba2b-4c3855b3d665', '356e7756-7c92-4b18-8704-68420a906794', 'D) Posição Plana: posição na qual a face da solda encontra-se em um plano aproximadamente horizontal e o seu eixo encontra-se em um plano aproximadamente vertical;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fddda97c-cdee-443e-9b52-6b0e176d9079', '356e7756-7c92-4b18-8704-68420a906794', 'E) Posição Vertical, progressão Ascendente: posição na qual o eixo da solda encontra-se aproximadamente no plano vertical, sendo a solda executada no sentido: superior - inferior; 21', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e984c172-17a8-41b0-98a6-2a4ba01d361d', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 32', 'Resolva a questão', 29)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2f7249fd-0744-4476-a3ac-1ad257893916', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'e984c172-17a8-41b0-98a6-2a4ba01d361d', 'multiple_choice', 'Das alternativas apresentadas a seguir, marque aquela que não é um Consumível de Soldagem. \n\n<img src="/images/questions/page21_img1.jpeg" width="100%" />\n\n<img src="/images/questions/page21_img2.jpeg" width="100%" />', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6b4a057f-b48e-4b47-8a8e-46bfbb60d2f2', '2f7249fd-0744-4476-a3ac-1ad257893916', 'A) Arame tubular;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a0a7ad74-e1a8-4a02-92fc-52c9f8bd2abe', '2f7249fd-0744-4476-a3ac-1ad257893916', 'B) Gás de proteção;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fee90692-e783-45e1-8315-22e7240cf8c8', '2f7249fd-0744-4476-a3ac-1ad257893916', 'C) Arame sólido;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('322a6609-0d1d-4164-8cf9-9d3028e67c2e', '2f7249fd-0744-4476-a3ac-1ad257893916', 'D) Eletrodo de tungstênio;', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f9cad71-6412-4546-b167-90853c508066', '2f7249fd-0744-4476-a3ac-1ad257893916', 'E) Fluxo para o processo arco submerso.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('8583e951-6769-4fd6-b40a-04021901d693', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 33', 'Resolva a questão', 30)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b2788793-687f-40a9-b9b6-c6d54e764e53', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '8583e951-6769-4fd6-b40a-04021901d693', 'multiple_choice', 'Dos diferentes tipos de posições de soldagem apresentados nos croquis a seguir, assinale a alternativa incorreta I II III IV V \n\n<img src="/images/questions/page21_img1.jpeg" width="100%" />\n\n<img src="/images/questions/page21_img2.jpeg" width="100%" />', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('600db09d-6706-4c73-afa8-4ae04c7972d5', 'b2788793-687f-40a9-b9b6-c6d54e764e53', 'A) Croqui I – Posição Horizontal;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('99ded236-a4ca-4fd8-9769-26c65f55e9bb', 'b2788793-687f-40a9-b9b6-c6d54e764e53', 'B) Croquis II e V – Posição Vertical, progressões Ascendente e Descendente, respectivamente; 22', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06786d20-f6e1-4e13-82a2-e560c892cf47', 'b2788793-687f-40a9-b9b6-c6d54e764e53', 'C) Croqui III – Posição Sobre-cabeça;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bf97c3b1-e564-4598-8ac1-21475a4394ed', 'b2788793-687f-40a9-b9b6-c6d54e764e53', 'D) Croqui IV – Posição Plana;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d525fd8-af57-4750-8ce9-b31b3d536233', 'b2788793-687f-40a9-b9b6-c6d54e764e53', 'E) Croquis II e V – Posição Vertical, progressões Descendente e Ascendente, respectivamente;', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('877f8bdb-0d17-48f6-b4d3-c26399753133', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 34', 'Resolva a questão', 31)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', '877f8bdb-0d17-48f6-b4d3-c26399753133', 'multiple_choice', 'Analisando a definição do termo “Dimensão da solda”, em função dos seus diferentes tipos, marque a alternativa incorreta. I II III IV V \n\n<img src="/images/questions/page22_img1.png" width="100%" />\n\n<img src="/images/questions/page22_img2.png" width="100%" />', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2c178915-2989-4468-8092-2233a1d3c49a', '8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'A) Croqui I;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d6d03c41-b43e-49de-9935-53176a8bfe90', '8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'B) Croqui II;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f2c01e38-efd7-4ac6-9ea3-5b4cb6712a7e', '8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'C) Croqui III;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c279e3fa-29f0-4f2d-93ea-f16ca3516957', '8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'D) Croqui IV;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5d72f103-0838-47cd-b255-d6c01871bec7', '8feeb10e-f171-4d47-9cc0-ec18b79f5988', 'E) Croqui V.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c45c5ebc-13a6-4859-8936-7f52cba18a33', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 35', 'Resolva a questão', 32)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('aa409855-f4be-4ad2-bd90-231e2aee9128', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'c45c5ebc-13a6-4859-8936-7f52cba18a33', 'multiple_choice', 'Em relação aos tipos de gases utilizados na soldagem, marque a alternativa incorreta. . 23 \n\n<img src="/images/questions/page22_img1.png" width="100%" />\n\n<img src="/images/questions/page22_img2.png" width="100%" />', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5f68803c-c915-422e-8856-437e6b754288', 'aa409855-f4be-4ad2-bd90-231e2aee9128', 'A) Gás inerte é todo aquele que não reage quimicamente com o metal de base ou metal de adição em fusão;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e044829a-0380-44ca-9432-ac26e2c6b757', 'aa409855-f4be-4ad2-bd90-231e2aee9128', 'B) Os gases oxidantes e redutores são tipos de gases ativos;', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1b291dd5-a362-4e40-89ce-214262875398', 'aa409855-f4be-4ad2-bd90-231e2aee9128', 'C) Os gases oxidantes são aqueles gases que reagem quimicamente com o metal de solda ainda no estado líquido, como por exemplo: Argônio e Hélio;', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e8f75872-b52b-4474-8880-6193e58b454d', 'aa409855-f4be-4ad2-bd90-231e2aee9128', 'D) Atmosfera Protetora é o envoltório de gás que circunda a parte a ser soldada, com a finalidade de proteger a poça de fusão;', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('740fe360-1b74-46cf-bbf8-7eeb2d61ceb8', 'aa409855-f4be-4ad2-bd90-231e2aee9128', 'E) Atmosfera Reativa é uma atmosfera tipicamente ativa, que, em elevadas temperaturas, reduz óxidos ao seu estado metálico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('a937a2d6-af12-4ca4-af7e-83032ac08e26', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'activity', 'Questão 36', 'Resolva a questão', 33)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('50108934-30ca-44be-99b5-eab31d09043a', 'd7f2ee78-7577-460f-96c4-f4aa24d7d5ea', 'a937a2d6-af12-4ca4-af7e-83032ac08e26', 'multiple_choice', 'Das definições apresentadas abaixo, assinale a alternativa correta. ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0a9a5561-9399-4593-a7d9-44e95dd5f60e', '50108934-30ca-44be-99b5-eab31d09043a', 'A) Margem da solda: junção entre a face da solda e o metal de solda;', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d60e560b-5357-44b0-b78f-04c4e0abbaed', '50108934-30ca-44be-99b5-eab31d09043a', 'B) Corpo de prova: amostra retirada e identificada da chapa ou tubo de teste, quando se objetiva conhecer as propriedades mecânicas, entre outras propriedades da junta soldada;', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef378cdf-7b12-4fd6-a7a4-733951f653bc', '50108934-30ca-44be-99b5-eab31d09043a', 'C) Escória: resíduo metálico proveniente da fusão do fluxo ou revestimento e também de impurezas provenientes do metal de adição;', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ec969b48-bc30-4acb-b749-a7f5e5a2f716', '50108934-30ca-44be-99b5-eab31d09043a', 'D) Abertura da raiz: máxima distância que separa os componentes a serem unidos por soldagem ou processos afins.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69bfeb9a-2fcf-4794-9884-65aabe9f2d4e', '50108934-30ca-44be-99b5-eab31d09043a', 'E) Solda: união localizada de metais, produzido pelo aquecimento dos mesmos a uma temperatura adequada, com ou sem aplicação de pressão, havendo a obrigatoriedade de se empregar um metal de adição.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('590c4198-d509-4c49-9519-673d28b5715e', 'c5555555-5555-5555-5555-555555555555', 'Proteção da Soldagem', 'Questões e atividades sobre Proteção da Soldagem', 11, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('d8e2ecb3-14dd-467a-8faa-0e73dea77617', '590c4198-d509-4c49-9519-673d28b5715e', 'Prática - Proteção da Soldagem', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('479b6fba-87a1-44d6-8a45-0f53c967decb', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1ffd1636-d762-4deb-b074-02c49d7b69dc', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '479b6fba-87a1-44d6-8a45-0f53c967decb', 'multiple_choice', 'Em relação à Proteção na Soldagem, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('569ff524-f29f-4fea-ae2b-f106c5864d56', '1ffd1636-d762-4deb-b074-02c49d7b69dc', 'A) Os equipamentos de proteção individual (EPI) são projetados com a única finalidade de evitar lesões ou doenças que possam ocorrer nas operações de solda.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18f32ea1-01ab-453a-ae42-7a4cb3af4e83', '1ffd1636-d762-4deb-b074-02c49d7b69dc', 'B) Os gases empregados nas operações de soldagem, bem como os fumos, podem provocar danos à saúde do soldador.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d70efe3-855c-43dc-b919-8e3c59ec6f13', '1ffd1636-d762-4deb-b074-02c49d7b69dc', 'C) A radiação ultravioleta, muito intensa nos processos GTAW e GMAW é capaz de decompor substâncias desengraxantes usadas na limpeza das peças, além de produzir ozônios e óxidos nítricos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7487d602-6bf9-4361-879f-95d9cd6fa44e', '1ffd1636-d762-4deb-b074-02c49d7b69dc', 'D) As passagens e vias de fuga, localizadas na área de trabalho, devem ser mantidas totalmente livres e desimpedidas.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('903d4b63-7a9f-4122-993a-d03c1a32bc4a', '1ffd1636-d762-4deb-b074-02c49d7b69dc', 'E) O soldador nunca deve enrolar o cabo de soldagem em volta de partes do seu corpo.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9428e81f-5859-4e18-9a5c-ea38dfb82cf2', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('898e77a5-8b18-4cdc-b468-647663a15a43', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '9428e81f-5859-4e18-9a5c-ea38dfb82cf2', 'multiple_choice', 'Em relação à Proteção na Soldagem, identifique a única alternativa abaixo que não é verdadeiramente um equipamento de proteção individual (EPI). ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18f4329a-b68f-419f-8df3-5c3fc96b3c5e', '898e77a5-8b18-4cdc-b468-647663a15a43', 'F) Botas (ou botinas)', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b5875b8e-1f4e-47f8-932b-594b1f62b945', '898e77a5-8b18-4cdc-b468-647663a15a43', 'G) Avental', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db233b0d-16b7-499f-9608-5cd89fe2cedd', '898e77a5-8b18-4cdc-b468-647663a15a43', 'H) Luva', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0815b5ee-6b49-4657-bbb2-c64e25aa0e1d', '898e77a5-8b18-4cdc-b468-647663a15a43', 'I) Capuz ou gorro para a cabeça', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5e0bbb4a-9e21-4bbb-b3af-2cacfe357ed9', '898e77a5-8b18-4cdc-b468-647663a15a43', 'J) Meia (anti-térmica)', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('14c9b73e-ce4c-4d1c-9565-65ab68527fd7', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('09d5e443-2d7d-4dfd-a942-c257e031334c', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '14c9b73e-ce4c-4d1c-9565-65ab68527fd7', 'multiple_choice', 'Qual dos consumíveis abaixo, quando derretidos, gera uma grande quantidade de fumaça (fumo)?. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0a167563-bf16-4ff5-841c-ea9a0b88d1c0', '09d5e443-2d7d-4dfd-a942-c257e031334c', 'A) Arame tubular com proteção gasosa (proteção externa)', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('44cf0504-b8ae-437d-b62b-6866bc0b43aa', '09d5e443-2d7d-4dfd-a942-c257e031334c', 'B) Eletrodo revestido', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('24491a84-dcff-451d-ad98-c1a84fd87625', '09d5e443-2d7d-4dfd-a942-c257e031334c', 'C) Arame sólido empregado no processo GMAW', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a55741ec-f77f-429f-aba7-17ae3ef18c9d', '09d5e443-2d7d-4dfd-a942-c257e031334c', 'D) Arame tubular auto-protegido', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c17d0b54-b535-4eef-9d76-df76da782e60', '09d5e443-2d7d-4dfd-a942-c257e031334c', 'E) Arame sólido empregado no processo SAW', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('2b3d167f-8178-4886-8533-1329b22dcf22', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 2', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '2b3d167f-8178-4886-8533-1329b22dcf22', 'multiple_choice', '4 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('725f4043-d90a-4ab3-a17f-fec82d36973d', '7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'K) Caso uma luva, ou outro equipamento de proteção individual que fique em contato direto com a pele, se rasgue por qualquer motivo, o profissional deverá substituí-la na maior brevidade possível.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('44f55329-98c8-41fa-ad20-424d940ad648', '7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'L) Todos os equipamentos de proteção individual (EPIs) são de uso pessoal e intransferível. Se um determinado equipamento não for mais usado por um soldador, aquele deverá ser totalmente descartado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1e9d77ea-79e7-47b6-8e39-4c696930db6a', '7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'M) Roupas pessoais como cuecas e meias não podem ser feitas de nylon ou poliéster.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b97c2098-9808-4d01-8b04-79a3cf975593', '7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'N) A soldagem de metais é uma das mais importantes e usadas técnica utilizada na indústria que, por sua vez, expõe demasiadamente seus profissionais a riscos constantes.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2f0fee91-19e2-48ba-9178-5de10c44602b', '7cdea6c6-a2f8-47f3-b697-e18471f6a7e6', 'O) Os riscos, aos quais os soldadores são expostos diariamente, podem se apresentar isoladamente ou em conjunto, afetando principalmente a saúde destes profissionais.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('818594a9-082d-4014-a491-9d703a693e16', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('329729f7-5cf6-4231-8e76-14d9ae3c0254', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '818594a9-082d-4014-a491-9d703a693e16', 'multiple_choice', 'Qual a principal função das “Lentes Filtrantes” (ou vidros protetores), quando do emprego de processos de soldagem a arco elétrico? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('43b9990a-0178-4bc0-aeee-b4a1a8a11061', '329729f7-5cf6-4231-8e76-14d9ae3c0254', 'A) Absorver apenas os raios infravermelhos gerados pelo arco elétrico.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f3a43f20-cca3-4243-b0cb-227fccd3b72f', '329729f7-5cf6-4231-8e76-14d9ae3c0254', 'B) Absorver apenas os raios ultravioletas gerados pelo arco elétrico.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d4c514d2-b403-414f-8e50-e5fc08ccd031', '329729f7-5cf6-4231-8e76-14d9ae3c0254', 'C) Absorver os raios infravermelhos e ultravioletas gerados pelo arco elétrico.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f7b16b2d-20fa-4842-801d-efc77f115901', '329729f7-5cf6-4231-8e76-14d9ae3c0254', 'D) Absorver os raios solares e invisíveis gerados pelo arco elétrico.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f46d84fa-9622-4ecb-abeb-aa911a423791', '329729f7-5cf6-4231-8e76-14d9ae3c0254', 'E) Absorver principalmente os raios invisíveis gerados pelo arco elétrico, visto a impossibilidade de percebê-lo a olho nu.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('336cb437-5208-4be9-b97a-16801758acf9', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 6', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('79a66cbf-d30d-4e32-9704-2266fc730fee', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '336cb437-5208-4be9-b97a-16801758acf9', 'multiple_choice', 'Qual das alternativas apresentadas a seguir não é uma característica das “Lentes de Cobertura”? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('01f1feaf-f0a2-471c-bc28-514dd27c4085', '79a66cbf-d30d-4e32-9704-2266fc730fee', 'K) Protegem as lentes filtrantes, assim como os olhos do soldador, contra salpicos gerados durante a soldagem.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3f0a06d9-5d72-4af5-9f76-63dc7d0d43b0', '79a66cbf-d30d-4e32-9704-2266fc730fee', 'L) Por questão de segurança, elas devem ser resistentes ao impacto.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be99a15b-3ee1-43f0-9d91-047726e5a67e', '79a66cbf-d30d-4e32-9704-2266fc730fee', 'M) Precisam ser transparentes.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6ee7f14a-893f-4063-9470-a1f66789b095', '79a66cbf-d30d-4e32-9704-2266fc730fee', 'N) Podem ser feitas de vidro.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9f5c3e8-8604-4211-8ebc-56747e754871', '79a66cbf-d30d-4e32-9704-2266fc730fee', 'O) Podem ser feitas de plástico auto-extinguível.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('101bcc0e-6131-49bf-8c36-c8491d7e84cf', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 7', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '101bcc0e-6131-49bf-8c36-c8491d7e84cf', 'multiple_choice', 'Analisando o processo de soldagem oxi-gás, identifique a alternativa que não representa um risco ao soldador. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7d47f55e-79dc-4a4a-8b4d-199115b0a056', '7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'K) Ruído', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('922bc709-549b-4254-a310-768f0c469f2f', '7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'L) Gases', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('80aabfd4-413c-428d-96ec-c64c4883b795', '7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'M) Fumos', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bd37b9e2-73dc-4c90-b049-49fab6c6e74e', '7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'N) Queimadura', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('250b29bf-b90a-4489-8902-1c0a60950ece', '7c7e1749-b0da-4dc2-bc79-5387e2b098b1', 'O) Choque elétrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b802eeb6-ae33-4463-a750-1b29d1bb9d81', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3c308f10-93da-4679-8e33-7ad1fb09881a', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'b802eeb6-ae33-4463-a750-1b29d1bb9d81', 'multiple_choice', 'Analisando o “processo de soldagem manual a arco com eletrodo revestido” e os cuidados que devem ser tomados ao usá-lo, identifique a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ef9f6c1c-3b30-41fc-9f08-834c5a454468', '3c308f10-93da-4679-8e33-7ad1fb09881a', 'A) Tendo em vista que o porta-eletrodo é um equipamento de soldagem totalmente protegido contra choques elétricos, isto permite que, quando este equipamento de soldagem atingir altas temperaturas, o soldador mergulhe-o dentro de um recipiente (exemplo: balde) contendo água fria;', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cf38e7b4-91fb-4ee6-9539-60b23e7f0788', '3c308f10-93da-4679-8e33-7ad1fb09881a', 'B) Todos os equipamentos de soldagem relativos a este processo são adequados a operar em atmosferas contendo gases, poeira e raios provenientes da soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0fbbbd4e-2f51-44b5-b339-b520ce66ab61', '3c308f10-93da-4679-8e33-7ad1fb09881a', 'C) Os cabos (cabo-terra e cabo que liga a fonte ao eletrodo) devem ter seus revestimentos sem falhas, pois isto pode resultar em uma má qualidade do isolamento e da condutividade elétrica.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30598275-ab24-40ac-b2fe-d2a23fcd94b0', '3c308f10-93da-4679-8e33-7ad1fb09881a', 'D) Uma ventilação adequada é muito importante quando do uso deste processo, haja vista a geração de fumos e gases nocivos à saúde', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6f30945f-4043-4801-88f4-915bc85fa8c4', '3c308f10-93da-4679-8e33-7ad1fb09881a', 'E) Todas as vezes que o soldador interromper o trabalho por um tempo apreciável, o mesmo deve desconectar o porta-eletrodo da fonte de energia.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('83de4705-337a-47fb-bda2-57de3338ffd7', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 2', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('cfd9974b-3b73-4543-9958-cc0d41183bcd', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '83de4705-337a-47fb-bda2-57de3338ffd7', 'multiple_choice', '6 ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c6e31ff2-fbc9-4a1f-baa1-fc986f65884b', 'cfd9974b-3b73-4543-9958-cc0d41183bcd', 'C) O operador de soldagem deve usar máscara de proteção (com filtro número 10), devido aos lampejos e centelhas produzidos pelo arco durante a soldagem.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bbe0de12-95b0-47d8-a7d9-2feecc1635ea', 'cfd9974b-3b73-4543-9958-cc0d41183bcd', 'D) Assim como outros processos de soldagem, o fluxo pertencente ao processo a arco submerso também pode produzir gases nocivos à saúde quando fundido.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7d8ddd5e-8c14-41ec-a3f4-74d5a88ce8c0', 'cfd9974b-3b73-4543-9958-cc0d41183bcd', 'E) O operador deve prestar atenção ao volume de fluxo que é depositado sobre o arco durante a soldagem. Uma diminuição acentuada do volume do fluxo pode permitir que o arco elétrico passe pela camada fina do fluxo e atinja os olhos do profissional.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('0e91c2f1-51c5-4e5f-aa3d-e13bac112ab0', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 10', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '0e91c2f1-51c5-4e5f-aa3d-e13bac112ab0', 'multiple_choice', 'Em relação ao processo de soldagem GTAW, identifique o maior risco à saúde que este processo pode causar ao soldador. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('84727ce0-8571-4603-af6a-7248b212e920', 'd95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'A) Possibilidade de grande ingestão de fumaça produzida pelo gás (ou mistura gasosa) de proteção.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b7354ee-0e98-4a71-a9a0-d68e5f85c8d6', 'd95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'B) Queimadura provocada por respingos (salpicos) produzidos durante a soldagem.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81c077f7-dc18-4975-a912-3ae992c2fb9f', 'd95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'C) Devido à produção de grande volume de escória, isto aumenta a possibilidade de ferimentos na região dos olhos do soldador no momento de sua remoção.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1cb52a14-4892-49c0-8f9a-022394841978', 'd95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'D) Queimadura da pele provocada pela grande quantidade de raio ultravioleta produzido durante a soldagem.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('69f6250b-77f4-43ef-9912-1d878df5b921', 'd95d7fb2-3ec8-43b9-9b97-d5b5fef89ead', 'E) Possibilidade de desmaios temporários, quando o trabalho é executado em recinto fechado, devido ao calor gerado pelas altas temperaturas do arco elétrico.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('044fa545-3d6a-4d92-9b7b-ef6acf583910', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 2', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('388224b0-9a55-4148-aadc-9eadd0ba27c3', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '044fa545-3d6a-4d92-9b7b-ef6acf583910', 'multiple_choice', '7 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a77a8766-3526-4aa3-8c1c-9098ab0850ee', '388224b0-9a55-4148-aadc-9eadd0ba27c3', 'D) Os cilindros feitos de paredes duplas, destinados a armazenar gases liquefeitos, devem ser transportados e manuseados na posição vertical.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e28f053a-6bd6-4b04-a9a6-cc92a9a42b19', '388224b0-9a55-4148-aadc-9eadd0ba27c3', 'E) Os cilindros de acetileno devem sempre ser usados na posição vertical.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('abe9029d-f838-4543-9ead-6c2e1f2fec5a', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 12', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9271789e-07b1-46ec-a140-3db5982ae9ed', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'abe9029d-f838-4543-9ead-6c2e1f2fec5a', 'multiple_choice', 'Quanto às características de um ambiente de soldagem, no que diz respeito à proteção dos soldadores ou operadores de soldagem, qual das alternativas a seguir está incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4e94a453-a691-4e81-8b76-35a6f91ded1b', '9271789e-07b1-46ec-a140-3db5982ae9ed', 'A) O piso da fábrica deve ser de concreto antiderrapante ou com revestimento à prova de fogo.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('402f15e8-15a4-4e17-9b09-85eee4ce3af2', '9271789e-07b1-46ec-a140-3db5982ae9ed', 'B) O uso da iluminação natural ou artificial deve incidir sobre a área de trabalho vinda do alto e por trás dos profissionais, reduzindo a possibilidade de ofuscamento.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('8d5b8c14-4c44-409a-b290-2babd1720d7c', '9271789e-07b1-46ec-a140-3db5982ae9ed', 'C) Para as pessoas que circulam por um determinado setor da fábrica e não serem atingidas pelos raios do arco elétrico, fagulhas ou centelhas, é muito importante a instalação de anteparos feitos de madeira ou lona, em forma de biombo ou cortina, em lugares estratégicos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e73ea509-218f-48f5-843f-5aabb3602ace', '9271789e-07b1-46ec-a140-3db5982ae9ed', 'D) As operações de soldagem, sempre que possível, devem ser realizadas em ambiente apropriado, projetado para oferecer a máxima condição de segurança.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2214a385-7598-49f6-93b1-ff625a24f638', '9271789e-07b1-46ec-a140-3db5982ae9ed', 'E) A pintura das paredes é um item de pouco ou nenhuma importância em uma fábrica. Este detalhe não é relevante, quanto à sua capacidade de pôr em perigo os profissionais que circulam pela fábrica.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('3153d651-8534-4c4f-b058-554dd448c5a2', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 14', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('2ef672e1-6cb1-4084-9f11-11f649c50088', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', '3153d651-8534-4c4f-b058-554dd448c5a2', 'multiple_choice', 'No que diz respeito às “Lentes Filtrantes”, marque a alternativa correta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('103ab0b6-c122-4d61-815e-440da350cfa1', '2ef672e1-6cb1-4084-9f11-11f649c50088', 'A) O número de identificação (padronizado) estabelecido para as lentes filtrantes é tanto maior, quanto maior for a proteção conferida pelas mesmas.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bf42383c-498f-4e3b-b0c2-b1585fc75b87', '2ef672e1-6cb1-4084-9f11-11f649c50088', 'B) Enquanto o processo manual com eletrodo revestido exige o uso de lentes filtrantes com numeração entre 4 e 6, o processo oxi-acetilênico estabelece faixa de 10 a 14.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dbc03b1f-e56e-40db-b83c-0d7063d0fc42', '2ef672e1-6cb1-4084-9f11-11f649c50088', 'C) O uso de lente filtrante não é obrigatório, quando da operação de corte de metais pelo processo oxi-gás.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('495acf64-a23f-44c6-9c09-84d34c805f94', '2ef672e1-6cb1-4084-9f11-11f649c50088', 'D) É totalmente recomendável o uso de lentes filtrantes mais escuros do que o estabelecido pelo código interno de segurança, haja vista que este procedimento protege sobremaneira a os olhos do profissional.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('66ccbd7c-1f17-4bca-abe9-809acafe4808', '2ef672e1-6cb1-4084-9f11-11f649c50088', 'E) Lentes filtrantes com numeração menor do que aquela que deveria ser usada, conforme a recomendação do fabricante, permitem uma melhor visualização da região que está sendo soldada, diminuindo ou evitando a produção de descontinuidades na junta soldada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('d34c0414-3ba9-42e5-bad8-c5d92f567f09', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'activity', 'Questão 15', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('bb4a4783-5152-4484-aeab-521751881dc1', 'd8e2ecb3-14dd-467a-8faa-0e73dea77617', 'd34c0414-3ba9-42e5-bad8-c5d92f567f09', 'multiple_choice', 'O que significa a letra “H” na designação de uma “Lente Filtrante” (ou filtro)? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0ff6a9a1-391a-4e4f-ba50-296236e7a172', 'bb4a4783-5152-4484-aeab-521751881dc1', 'A) Lente específica para processos de soldagem manual e semi- automático.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('268cdc9c-dd25-47ff-8e67-7e7609351e3f', 'bb4a4783-5152-4484-aeab-521751881dc1', 'B) Lente específica para processos de soldagem automáticos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('06d84f8d-331c-43b9-bf7d-5dda62d4ea12', 'bb4a4783-5152-4484-aeab-521751881dc1', 'C) Possibilidade de uso para qualquer valor de intensidade de corrente elétrica.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4db36d38-e685-47c6-b9ff-fb3f75eb27e9', 'bb4a4783-5152-4484-aeab-521751881dc1', 'D) Resistente ao impacto.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3430fe39-a754-41d7-ba96-038aca92d1b1', 'bb4a4783-5152-4484-aeab-521751881dc1', 'E) A letra H significa que a lente filtrante é feita basicamente de hidrocarbonetos (HxCy).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.modules (id, course_id, title, description, position, is_published) VALUES
('76cf645f-7d00-4af3-8a63-295af5d5ad03', 'c5555555-5555-5555-5555-555555555555', 'Ensaios Não Destrutivos', 'Questões e atividades sobre Ensaios Não Destrutivos', 12, true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lessons (id, module_id, title, description, estimated_minutes, position, lesson_type, is_published) VALUES
('934dd4d4-5b4c-471d-bd3c-48439579194c', '76cf645f-7d00-4af3-8a63-295af5d5ad03', 'Prática - Ensaios Não Destrutivos', 'Exercícios do banco.', 60, 1, 'interactive', true)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('caffb921-b5cf-4107-bbf0-f2c5a73ef4e6', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'caffb921-b5cf-4107-bbf0-f2c5a73ef4e6', 'multiple_choice', 'Em qual material o som se propaga com maior velocidade? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d1b3d63f-4e44-4160-b4db-7fa2609b790d', '0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', 'K) Madeira', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a0d82eae-2b2b-4b2f-a565-944de23dcb72', '0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', 'L) Água', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7e9ee651-bb70-46bd-b4fa-f2e7001041bd', '0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', 'M) Ar', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e70941b6-2c31-434c-8c9d-fe9f47c08f6c', '0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', 'N) Metal', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9ae4f321-4222-4ecf-93dd-5c3b2310b76d', '0ef1e9f1-bb50-496a-ad52-3410d9e0a73a', 'O) Vácuo', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('937e477f-54a0-4b3a-9bb5-2e1f7d22aa6e', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 2', 'Resolva a questão', 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('4511ace8-eb70-499b-9eac-874b9c779768', '934dd4d4-5b4c-471d-bd3c-48439579194c', '937e477f-54a0-4b3a-9bb5-2e1f7d22aa6e', 'multiple_choice', 'Como o som é uma energia que se propaga através de ondas mecânicas, qual o valor da velocidade do som no vácuo? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0f12a993-450b-48f8-a06b-057fe71387ea', '4511ace8-eb70-499b-9eac-874b9c779768', 'A) 340 m/s.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('83ac1166-bd2a-4214-901b-44eba2e16aee', '4511ace8-eb70-499b-9eac-874b9c779768', 'B) 42,5 m/s', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f8efb035-6d10-4ab1-9a0b-043de060eb54', '4511ace8-eb70-499b-9eac-874b9c779768', 'C) 0 m/s', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('be29bda2-f549-4a72-a069-181f13a0cee3', '4511ace8-eb70-499b-9eac-874b9c779768', 'D) 170 m/s', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4f1f2c71-08ae-4f58-87ec-37fff0775c6b', '4511ace8-eb70-499b-9eac-874b9c779768', 'E) 85 m/s', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('25b7343d-2275-4a2b-8bec-30966ed0507d', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 3', 'Resolva a questão', 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('1281ba3c-a71f-40ca-9408-66a1cbc58460', '934dd4d4-5b4c-471d-bd3c-48439579194c', '25b7343d-2275-4a2b-8bec-30966ed0507d', 'multiple_choice', 'Das alternativas apresentadas a seguir, indique aquela que não é uma vantagem do ensaio não destrutivo por Ultra-Som. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4fcc0c9a-1aa2-4b37-9595-f9c06ed2a003', '1281ba3c-a71f-40ca-9408-66a1cbc58460', 'A) Seus registros, para qualquer tipo de equipamento utilizado, são permanentes, podendo ser arquivados para futuras interpretações.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('34d83715-f08d-4c33-9134-da9100cd2729', '1281ba3c-a71f-40ca-9408-66a1cbc58460', 'B) Oferece risco zero à saúde do profissional que executa o ensaio.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a2461c01-4e28-4e16-ba91-c6a7fb43dc89', '1281ba3c-a71f-40ca-9408-66a1cbc58460', 'C) Pode ser utilizado em materiais metálicos e não metálicos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4b4eb288-d63c-4099-8a9d-30ab034f5c99', '1281ba3c-a71f-40ca-9408-66a1cbc58460', 'D) Não necessita de acesso em ambas as superfícies da peça para a realização da inspeção.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('50d0c007-a668-4ba3-a3ea-7ddb0b4ad3be', '1281ba3c-a71f-40ca-9408-66a1cbc58460', 'E) Permite localizar e dimensionar com precisão as descontinuidades.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7baeeb58-1053-4725-b59a-d0e7e6ff559a', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('689c7979-b7bc-4d03-acf0-754ed1121547', '934dd4d4-5b4c-471d-bd3c-48439579194c', '7baeeb58-1053-4725-b59a-d0e7e6ff559a', 'multiple_choice', '2 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fd3edbf1-fc16-40bd-8912-c1fe0ade8c31', '689c7979-b7bc-4d03-acf0-754ed1121547', 'C) Ensaio que não precisa de preparação (limpeza) na região onde será inspecionada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d757953c-a4a8-4783-9bef-365b392ab02b', '689c7979-b7bc-4d03-acf0-754ed1121547', 'D) Custo baixo dos equipamentos utilizados neste ensaio.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9c456f59-428b-4e78-a9d4-fb56d9c09847', '689c7979-b7bc-4d03-acf0-754ed1121547', 'E) Ensaio de fácil interpretação.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('537afcda-5445-454a-ab01-6137639655e9', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 5', 'Resolva a questão', 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('22b04d73-78dc-4443-8b63-9edf4f340b5f', '934dd4d4-5b4c-471d-bd3c-48439579194c', '537afcda-5445-454a-ab01-6137639655e9', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique aquela que não está relacionada com a realização do Ensaio Visual. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d49e3c0b-a47c-4b73-a4e0-b445f6630147', '22b04d73-78dc-4443-8b63-9edf4f340b5f', 'A) Dos ensaios conhecidos como “não destrutivos”, este é considerado o ensaio mais básico entre todos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7067ceef-353b-4bf3-a120-d4614c4b371a', '22b04d73-78dc-4443-8b63-9edf4f340b5f', 'B) Os demais ensaios não destrutivos só podem ser executados após a realização do ensaio visual.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1d626a3d-be86-4737-aaef-561a236cb4ff', '22b04d73-78dc-4443-8b63-9edf4f340b5f', 'C) O ensaio visual pode ser realizado à vista desarmada, ou seja, sem auxílio de algum dispositivo ótico.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fcabd57c-1bf0-4d59-adc6-7038a98c1140', '22b04d73-78dc-4443-8b63-9edf4f340b5f', 'D) Por não necessitar que seja realizada uma limpeza na região a ser analisada, este é considerado o ensaio mais rápido dentre todos.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f58f8fc3-eb26-4758-bc7d-8e7e67542127', '22b04d73-78dc-4443-8b63-9edf4f340b5f', 'E) O ensaio visual pode ser realizado com auxílio de uma lupa ou com aparelhos do tipo endoscópio (inspeção remota).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f1377c28-9f6d-4cf1-941a-b97be30ae011', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 6', 'Resolva a questão', 6)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('f36eb723-a1ba-4c9e-ac64-5fd810cdf036', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'f1377c28-9f6d-4cf1-941a-b97be30ae011', 'multiple_choice', 'Qual, das alternativas apresentadas a seguir, não é uma vantagem do Ensaio Visual? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f7b7aa16-938f-4845-ac01-802bc56d37bd', 'f36eb723-a1ba-4c9e-ac64-5fd810cdf036', 'A) Permite a correção de descontinuidades antes que a soldagem da junta esteja terminada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e6378747-e0a5-4e51-b563-93b2a2524bd0', 'f36eb723-a1ba-4c9e-ac64-5fd810cdf036', 'B) Evita com que alguns tipos de descontinuidades só sejam removidos após a inspeção radiográfica ou ultrassônica.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('51be2a6a-b3d8-43a8-9b18-f528c935e781', 'f36eb723-a1ba-4c9e-ac64-5fd810cdf036', 'C) Ensaio que, bem executado, diminui o custo total da fabricação do equipamento.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('01f9c63a-f37f-4f4b-bd88-053d46d85672', 'f36eb723-a1ba-4c9e-ac64-5fd810cdf036', 'D) Ensaio de mais baixo custo entre todos os ensaios não destrutivos.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('219672fa-5e64-4a3f-babd-71f0a752d39a', 'f36eb723-a1ba-4c9e-ac64-5fd810cdf036', 'E) Ensaio que detecta descontinuidades com qualquer dimensão.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1053a4bf-f5ba-4921-9e43-1573db1cdfbd', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 7)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('5d64e492-a4a3-4611-be4a-419451512b19', '934dd4d4-5b4c-471d-bd3c-48439579194c', '1053a4bf-f5ba-4921-9e43-1573db1cdfbd', 'multiple_choice', '3 ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('030a109f-d3ea-4b75-ab44-0d5b8525dff0', '5d64e492-a4a3-4611-be4a-419451512b19', 'B) Dependendo da iluminação do local, este ensaio é capaz de detectar descontinuidades sub-superficiais.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('129ac3c5-d91c-4295-9139-f13260c4e724', '5d64e492-a4a3-4611-be4a-419451512b19', 'C) Ensaio que detecta as descontinuidades maiores e, geralmente, indica pontos de prováveis descontinuidades para ser posteriormente inspecionados por outros ensaios não destrutivos.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('18dabd78-f40b-4acd-a526-a4b96a7a31f7', '5d64e492-a4a3-4611-be4a-419451512b19', 'D) Não necessita de acesso em ambos os lados da peça para realizar a inspeção.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5aad84e2-be6c-4d31-b5c1-2b352fe97dbc', '5d64e492-a4a3-4611-be4a-419451512b19', 'E) Ensaio que permite a localização e dimensão precisas das descontinuidades em qualquer região do equipamento.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('1fd52e68-3701-46c1-8432-0d57892fdd2c', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 8', 'Resolva a questão', 8)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('a6891fde-47f0-467b-9e2c-6a66b82f2854', '934dd4d4-5b4c-471d-bd3c-48439579194c', '1fd52e68-3701-46c1-8432-0d57892fdd2c', 'multiple_choice', 'Identifique, entre as alternativas apresentadas a seguir, a região de uma junta de topo que não pode ser medida (quantificada) antes de iniciar a soldagem? ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('bb3d942c-cc75-48ab-b70f-39baa5fd5633', 'a6891fde-47f0-467b-9e2c-6a66b82f2854', 'A) Ângulo do bisel.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5af691ca-2caf-42b2-af1d-c39a7969f3bf', 'a6891fde-47f0-467b-9e2c-6a66b82f2854', 'B) Abertura da raiz.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2a85e754-e5cc-4359-8b30-0eff84d44a05', 'a6891fde-47f0-467b-9e2c-6a66b82f2854', 'C) Face da raiz.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6aa6be42-0d93-4c00-a37e-6d2d8fef3f92', 'a6891fde-47f0-467b-9e2c-6a66b82f2854', 'D) Face de fusão.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ee48e22c-a8b2-4db7-b7ce-a2c51ff24a2a', 'a6891fde-47f0-467b-9e2c-6a66b82f2854', 'E) Desalinhamento dos componentes (caso haja).', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('28d66ab6-fff6-4cc7-8b7b-6506fec57673', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 9', 'Resolva a questão', 9)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('83375324-0d72-4d4b-b5c9-e84fd1145643', '934dd4d4-5b4c-471d-bd3c-48439579194c', '28d66ab6-fff6-4cc7-8b7b-6506fec57673', 'multiple_choice', 'Qual, das alternativas apresentadas a seguir, é uma desvantagem única e exclusiva do Ensaio Visual? ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fcefdf96-67ed-4d69-b43c-15fb60f72f35', '83375324-0d72-4d4b-b5c9-e84fd1145643', 'A) Ensaio limitado à detecção de descontinuidades superficiais.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2b9c8b64-0730-481f-b962-53a4c0d25109', '83375324-0d72-4d4b-b5c9-e84fd1145643', 'B) Ensaio lento, o que acarreta no aumento do custo da obra.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('88dc5212-3a7b-47b7-8a12-bb7925916fc8', '83375324-0d72-4d4b-b5c9-e84fd1145643', 'C) Ensaio que detecta apenas descontinuidades volumétricas.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fcac8a64-9cb2-4dcf-b124-13e74c558223', '83375324-0d72-4d4b-b5c9-e84fd1145643', 'D) Ensaio que, apesar da precisão dos seus resultados, necessita de profissionais com grande experiência profissional e de um longo período de treinamento.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a8e62cf5-e811-432b-8459-d3e07958bdee', '83375324-0d72-4d4b-b5c9-e84fd1145643', 'E) Ensaio limitado a materiais do tipo “ferrosos”.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('efe399bd-76d9-4c23-85e0-928a133b9521', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 10)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6e1d3867-4429-4742-82a0-14f426d55b0b', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'efe399bd-76d9-4c23-85e0-928a133b9521', 'multiple_choice', '4 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c1210c56-7434-425c-93ba-14d108c3e0db', '6e1d3867-4429-4742-82a0-14f426d55b0b', 'B) Ensaios que não necessitam de um instrumento ou dispositivo para serem realizados.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a46431f4-7049-4e4e-ad4f-c7d3dddf48af', '6e1d3867-4429-4742-82a0-14f426d55b0b', 'C) Ensaios fáceis de serem executados.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3ef0fbba-0050-4d47-b080-2c5d133f2c1d', '6e1d3867-4429-4742-82a0-14f426d55b0b', 'D) Ensaios rápidos e seguros para a identificação dos metais metálicos e ligas metálicas mais utilizadas na indústria.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('afd5fb03-b440-4fdb-bd6a-16cd1f438acc', '6e1d3867-4429-4742-82a0-14f426d55b0b', 'E) Pode ser utilizado na identificação de materiais metálicos durante as fases de fabricação e montagem.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('921d7d0b-b571-475d-a01e-c94abb1e0d74', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 11', 'Resolva a questão', 11)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('82d55152-0813-4c57-aaab-6c068e16a650', '934dd4d4-5b4c-471d-bd3c-48439579194c', '921d7d0b-b571-475d-a01e-c94abb1e0d74', 'multiple_choice', 'Qual, dos metais apresentados a seguir, não é magnético? ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e9d7aec3-2435-4166-9730-f43e269b31c2', '82d55152-0813-4c57-aaab-6c068e16a650', 'A) Aço carbono.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9bf8db60-4bc0-459e-bb22-87fc9f7c90ce', '82d55152-0813-4c57-aaab-6c068e16a650', 'B) Ligas Cu-Ni.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('64cecd63-5d3e-4e4f-b5d2-8f3ffa555fc0', '82d55152-0813-4c57-aaab-6c068e16a650', 'C) Aço inoxidável ferrítico.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('efc72cd9-13bb-48c8-8933-8aa3158d59aa', '82d55152-0813-4c57-aaab-6c068e16a650', 'D) Aço inoxidável martensítico.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('92cec4e2-255b-4f08-b6e6-d0891ebee150', '82d55152-0813-4c57-aaab-6c068e16a650', 'E) Ferro fundido cinzento.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('e592b2a1-bafb-4ffb-90e4-74bbc314e44f', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 12', 'Resolva a questão', 12)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d4dff288-9475-4007-8d1d-3c64247cdf39', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'e592b2a1-bafb-4ffb-90e4-74bbc314e44f', 'multiple_choice', 'Qual, dos metais apresentados a seguir, é completamente anti- magnético? ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0c18c055-92b9-4097-ab89-fa327543682a', 'd4dff288-9475-4007-8d1d-3c64247cdf39', 'A) Aço liga.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c613fbd3-8940-49fa-83bf-96fafdbd335c', 'd4dff288-9475-4007-8d1d-3c64247cdf39', 'B) Níquel.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c823cd8c-ba7d-4128-9557-62818f3aea47', 'd4dff288-9475-4007-8d1d-3c64247cdf39', 'C) Aço C-Mn.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('70eef372-017d-419f-a518-ba6a007d3b52', 'd4dff288-9475-4007-8d1d-3c64247cdf39', 'D) Ferro fundido branco.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('ec745726-c2d0-4757-83d9-94da1d033b84', 'd4dff288-9475-4007-8d1d-3c64247cdf39', 'E) Aço inoxidável austenítico.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('585ab810-c193-4668-980d-d3aefdfe09e0', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 14', 'Resolva a questão', 13)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('05bd4f0e-5619-47c2-9315-0f199c2d8074', '934dd4d4-5b4c-471d-bd3c-48439579194c', '585ab810-c193-4668-980d-d3aefdfe09e0', 'multiple_choice', 'No Ensaio por Ultra-som, identifique a alternativa que mostra a finalidade do uso de um acoplante. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('02621e74-7477-43df-af2a-0e235fa4b6bb', '05bd4f0e-5619-47c2-9315-0f199c2d8074', 'A) Substância que permite que a maior parcela possível de som seja transmitida do cabeçote à peça, como também no sentido contrário.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3736952b-9d6c-4c99-9666-e6af292bff91', '05bd4f0e-5619-47c2-9315-0f199c2d8074', 'B) Material empregado entre os dispositivos do cabeçote, funcionando com um aglutinante (cola).', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d3794f7b-9cb3-4f02-ae6b-5e7eb453ec47', '05bd4f0e-5619-47c2-9315-0f199c2d8074', 'C) Permitir que a corrente elétrica, gerada pela fonte de energia, chegue até o cabeçote sem perda de eficiência.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('30c75cca-0bf8-4552-8edc-28e5f78c1041', '05bd4f0e-5619-47c2-9315-0f199c2d8074', 'D) Material que permite que o ultrassonista segure o cabeçote com firmeza durante o ensaio.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5258e4d3-840a-4603-ba71-fc7f762841c2', '05bd4f0e-5619-47c2-9315-0f199c2d8074', 'E) Cristal piezo-elétrico que age como emissor de som, colocado perpendicularmente à peça que será examinada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('604373a4-b160-4a5b-8b37-c25a897c0642', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 15', 'Resolva a questão', 14)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6168d30c-5739-4eb3-bb76-22b259878bfe', '934dd4d4-5b4c-471d-bd3c-48439579194c', '604373a4-b160-4a5b-8b37-c25a897c0642', 'multiple_choice', 'Das alternativas apresentadas a seguir, indique aquela que é uma desvantagem específica do ensaio não destrutivo por Ultra-Som. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('33ca344f-ed89-42b7-854f-b3e2d5d4107c', '6168d30c-5739-4eb3-bb76-22b259878bfe', 'A) Técnica de ensaio não destrutivo não aplicada a peças cuja forma, geometria e rugosidade superficial impeçam o perfeito acoplamento do cabeçote à peça.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('df0bab47-c55e-4a2f-847d-92c246d11da8', '6168d30c-5739-4eb3-bb76-22b259878bfe', 'B) É um ensaio não destrutivo relativamente demorado.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a8b895d-3641-4238-abbf-55061fc75226', '6168d30c-5739-4eb3-bb76-22b259878bfe', 'C) O aparelho de ultra-som é pesado, sendo extremamente difícil de ser carregado pelo operador.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('f755d574-82e9-4e66-987f-048ddb45059b', '6168d30c-5739-4eb3-bb76-22b259878bfe', 'D) Não proporciona, em hipótese alguma, o registro permanente dos resultados obtidos.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3f1caa8f-127e-451b-afb4-8bb0b3688919', '6168d30c-5739-4eb3-bb76-22b259878bfe', 'E) Não permite localizar e dimensionar com precisão as descontinuidades encontradas na região ensaiada.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('c2920cb7-f734-4923-9ad5-3a1a0fc5c1a5', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 15)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e2de9139-0f52-44c1-a139-aaa008c5669a', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'c2920cb7-f734-4923-9ad5-3a1a0fc5c1a5', 'multiple_choice', '6 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4a4b01e3-9ebf-45ef-80b1-832d1e5ce94a', 'e2de9139-0f52-44c1-a139-aaa008c5669a', 'C) O equipamento de ultra-som é caro, comparativamente aos outros ensaios não destrutivos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('81f9b8d9-c718-4a9c-b800-91bf1586512e', 'e2de9139-0f52-44c1-a139-aaa008c5669a', 'D) A identificação do tipo de descontinuidade requer grande treinamento e experiência do operador.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0dd7dddb-5494-4ba5-bf71-fdddec4125f2', 'e2de9139-0f52-44c1-a139-aaa008c5669a', 'E) A melhor detecção da descontinuidade depende da sua orientação no interior da junta soldada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f60be13a-cd50-44cf-a058-f3a280d16546', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 17', 'Resolva a questão', 16)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('3dda9b30-4a52-4671-b6c2-f38bee97ba37', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'f60be13a-cd50-44cf-a058-f3a280d16546', 'multiple_choice', 'Quanto aos diferentes tipos de cabeçotes utilizados no ensaio por Ultra- som, identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d5d14b43-6fec-425a-b18c-b9ce1d8974a3', '3dda9b30-4a52-4671-b6c2-f38bee97ba37', 'A) Um cabeçote Normal é composto basicamente de um cristal piezo- elétrico, disposto em um plano paralelo ao plano da peça a ser examinada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0649251c-ec41-4f9a-8de7-66deb95f1b73', '3dda9b30-4a52-4671-b6c2-f38bee97ba37', 'B) Um cabeçote Duplo-Cristal é composto basicamente de dois cristais piezo-elétricos: um agindo como emissor e o segundo como receptor.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5ea4910c-bc46-4854-8c28-73f43f87917b', '3dda9b30-4a52-4671-b6c2-f38bee97ba37', 'C) Um cabeçote Angular é composto basicamente de um cristal piezo- elétrico disposto em ângulo em relação ao plano da peça a ser examinada.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dc891afb-8f4e-4304-8069-d86b0f456df5', '3dda9b30-4a52-4671-b6c2-f38bee97ba37', 'D) Os cabeçotes do tipo Angular mais usuais são os 45º, 60º e 70º.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('667950c8-4506-4e46-934a-a6d99a53ca71', '3dda9b30-4a52-4671-b6c2-f38bee97ba37', 'E) Um cabeçote Duplo-Cristal tem esses cristais dispostos em um plano aproximadamente ortogonal ao da peça que será examinada.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('9a0f7fc8-47fc-43ef-981a-16a7642cee0a', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 18', 'Resolva a questão', 17)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('84e38373-7fca-44b8-a684-7fcdfc88969e', '934dd4d4-5b4c-471d-bd3c-48439579194c', '9a0f7fc8-47fc-43ef-981a-16a7642cee0a', 'multiple_choice', 'Em relação ao Ensaio Radiográfico, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('1c5926e2-92fb-44e9-aa5a-0d792877a5dd', '84e38373-7fca-44b8-a684-7fcdfc88969e', 'A) Os raios típicos usados neste ensaio são o “X” e o “γ” (gama).', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c0917975-e8a1-4442-ad9e-a2c0f5eedd1e', '84e38373-7fca-44b8-a684-7fcdfc88969e', 'B) Nem toda a radiação atravessa o material analisado, pois parte dela é absorvida por este material.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3beba005-b23b-4629-8ce9-e103eb907e21', '84e38373-7fca-44b8-a684-7fcdfc88969e', 'C) O método baseia-se na capacidade dos raios “X” e o “γ” penetrarem em materiais sólidos.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('dd63876b-2380-4dc7-8ce9-b51220b07698', '84e38373-7fca-44b8-a684-7fcdfc88969e', 'D) O comprimento de onda dos raios “X” e o “γ” são fundamentais neste ensaio; quanto maior este comprimento, maior a capacidade de penetração da radiação.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2ea759b1-fb67-4380-8fbf-cbdd25d31c49', '84e38373-7fca-44b8-a684-7fcdfc88969e', 'E) A quantidade de radiação absorvida depende da espessura do material.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7afe2ae4-b3ba-4b55-836b-beec2ae9a812', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 18)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b65a6346-e4f7-4ae7-a7d0-526fd05461ba', '934dd4d4-5b4c-471d-bd3c-48439579194c', '7afe2ae4-b3ba-4b55-836b-beec2ae9a812', 'multiple_choice', '7 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d9de59db-884d-44d9-97a3-36059f43930d', 'b65a6346-e4f7-4ae7-a7d0-526fd05461ba', 'A) Porosidade.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('171a4eb8-1f89-487d-8228-d824c050add4', 'b65a6346-e4f7-4ae7-a7d0-526fd05461ba', 'B) Trincas posicionadas paralelamente à espessura do material ensaiado.', true, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5a59c0bd-21cf-4208-9622-5f52c9f1f9d8', 'b65a6346-e4f7-4ae7-a7d0-526fd05461ba', 'C) Inclusão de escória.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('acfdd974-e258-4102-8ae1-ed436186c858', 'b65a6346-e4f7-4ae7-a7d0-526fd05461ba', 'D) Falta de penetração.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5b1323a2-9c69-49dc-8ca9-1f3bbd34a582', 'b65a6346-e4f7-4ae7-a7d0-526fd05461ba', 'E) Penetração excessiva.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('b458ea9b-bf90-43b4-9f88-755bf8abad7a', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 20', 'Resolva a questão', 19)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'b458ea9b-bf90-43b4-9f88-755bf8abad7a', 'multiple_choice', 'Qual das descontinuidades apresentadas a seguir é a mais fácil de ser detectada pelo Ensaio Radiográfico? ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db8d8789-5844-47e8-ac81-4abdd9717933', 'c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', 'A) Falta de fusão.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0a62e709-ade6-435e-97f8-79fb0704b8f2', 'c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', 'B) Mordedura.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9318fd10-1e5a-4a79-95fa-72a1ccdfcabe', 'c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', 'C) Inclusão metálica.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('fa75856b-fb12-473a-8735-0c5b9a3fece4', 'c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', 'D) Trinca sob cordão.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2601c620-d0f7-4968-8e27-850ebd2b406b', 'c5f8fb84-09ff-479f-99ea-b7d0a60fa1c8', 'E) Dupla laminação.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('f81b3b8b-bf68-474e-b399-5a14e8976194', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 21', 'Resolva a questão', 20)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('9f0290f1-e684-4b1d-b450-be98372dbc3c', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'f81b3b8b-bf68-474e-b399-5a14e8976194', 'multiple_choice', 'Qual das limitações apresentadas a seguir não está relacionada com o Ensaio Radiográfico. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e32d06e-ca75-42bd-843f-4b9d462f988f', '9f0290f1-e684-4b1d-b450-be98372dbc3c', 'A) Necessidade de acesso a ambas as superfícies da peça que será radiografada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('05ef0635-ff01-4d96-bf0e-9ac3e6cbd6ee', '9f0290f1-e684-4b1d-b450-be98372dbc3c', 'B) Necessidade de interrupção das atividades que são realizadas próximas ao local onde será realizado o ensaio.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('d48e324c-cc38-4e87-bd8e-eda1a86864b2', '9f0290f1-e684-4b1d-b450-be98372dbc3c', 'C) A análise das radiografias não exige experiência prévia do profissional que irá laudá-las.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2ec448b0-236d-41f7-9cb1-3d34043db411', '9f0290f1-e684-4b1d-b450-be98372dbc3c', 'D) Ensaio que necessita de grande tempo para ser executado.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('67ac085d-67c5-4526-88e1-739e6ee18690', '9f0290f1-e684-4b1d-b450-be98372dbc3c', 'E) Radiografias provenientes de juntas que apresentam uma certa complexidade de sua geometria são consideradas difíceis de serem interpretadas..', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('7678b278-b7cc-4ff9-b55a-34fbf10f2bb4', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 21)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('27950bb5-c269-429f-a7b4-e46b2c0830f5', '934dd4d4-5b4c-471d-bd3c-48439579194c', '7678b278-b7cc-4ff9-b55a-34fbf10f2bb4', 'multiple_choice', '8 ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2db2e7c1-e898-40e8-8c25-c53eb00488e0', '27950bb5-c269-429f-a7b4-e46b2c0830f5', 'D) Dificuldade na detecção de descontinuidades planares (bi-dimensionais) localizadas no interior do material.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5d9af0a6-ab18-4dbb-8141-43dbdf796ed9', '27950bb5-c269-429f-a7b4-e46b2c0830f5', 'E) Não proporciona registro permanente dos resultados obtidos.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('836a103d-63c0-4fed-8a1d-00cb8e668918', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 23', 'Resolva a questão', 22)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('6452fbd7-37c0-4fdd-ba99-aafff7f592a0', '934dd4d4-5b4c-471d-bd3c-48439579194c', '836a103d-63c0-4fed-8a1d-00cb8e668918', 'multiple_choice', 'Em relação ao Ensaio Radiográfico, identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c949fa53-0f2f-43a4-8e1f-5be27ce66147', '6452fbd7-37c0-4fdd-ba99-aafff7f592a0', 'A) Ensaio que detecta com facilidade descontinuidades volumétricas.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b438fc5c-9f3a-450f-84c5-e40f92d0d682', '6452fbd7-37c0-4fdd-ba99-aafff7f592a0', 'B) As radiações ionizantes dos raios X e γ têm uma ação nociva sobre o organismo humano.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('3d250e9f-a996-48ff-9052-d25d99d36093', '6452fbd7-37c0-4fdd-ba99-aafff7f592a0', 'C) Nem só os operadores radiográficos são afetados pelos raios X e γ. Todos aqueles que estiverem próximos à região do ensaio são também afetados pela radiação.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e899581-6c30-4570-9dc7-4f8df3aed43c', '6452fbd7-37c0-4fdd-ba99-aafff7f592a0', 'D) O filme radiográfico só é atingido, depois que a radiação atravessar toda a espessura do material.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e0fe6feb-a273-49d3-abb8-7add7c06e4a6', '6452fbd7-37c0-4fdd-ba99-aafff7f592a0', 'E) Ensaio que detecta com dificuldade descontinuidades planares.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4f032176-41c9-4740-be30-981828de08c4', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 24', 'Resolva a questão', 23)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('e5a46336-5603-405e-bdff-bdc49ff07c83', '934dd4d4-5b4c-471d-bd3c-48439579194c', '4f032176-41c9-4740-be30-981828de08c4', 'multiple_choice', 'Comparando os raios “X” e “γ” (gama), fontes de energia empregadas no Ensaio Radiográfico, identifique a alternativa incorreta. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9f06bf1a-7139-4856-adf1-ab0c30528150', 'e5a46336-5603-405e-bdff-bdc49ff07c83', 'A) O raio-X permite regular a tensão anódica, permitindo sua maior penetração na espessura da peça.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9c3c7384-40d7-4f0a-bd1f-c174954cc251', 'e5a46336-5603-405e-bdff-bdc49ff07c83', 'B) O raio-γ (gama) não permite, em hipótese alguma, variar o seu comprimento de onde.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2028cdd1-d3c6-44cf-8f86-6ba42bac9add', 'e5a46336-5603-405e-bdff-bdc49ff07c83', 'C) As instalações para uso do raio-γ (gama) são bem mais baratas do que às do raio-X.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20383ec9-2f5d-440c-b5b4-865635f6706c', 'e5a46336-5603-405e-bdff-bdc49ff07c83', 'D) Enquanto a emissão de raio-γ (gama) se dá espontaneamente, o raio-X necessita de energia elétrica para a sua geração.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('260e4bbd-dbfc-41bc-a084-8382b0d28ecd', 'e5a46336-5603-405e-bdff-bdc49ff07c83', 'E) Para peças com espessuras acima de 90 mm, o ensaio radiográfico ideal a ser empregado é a técnica com raio-X.', true, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('635b9a2b-4db5-4b8a-b413-b9f853c1c23d', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 1', 'Resolva a questão', 24)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('53fb8c0a-bff0-44db-b283-816f405cd4ac', '934dd4d4-5b4c-471d-bd3c-48439579194c', '635b9a2b-4db5-4b8a-b413-b9f853c1c23d', 'multiple_choice', '9 ', 'A alternativa correta é a letra B', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('5fa5bdf0-f9c9-49b0-ac53-5ada014971f2', '53fb8c0a-bff0-44db-b283-816f405cd4ac', 'C) Técnica indicada para quando há problemas de acesso à junta soldada ou região da peça a ser ensaiada.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('2a6c45d6-9a19-48fb-b782-9f535fe166f2', '53fb8c0a-bff0-44db-b283-816f405cd4ac', 'D) Indicada para efetuar radiografias circunferenciais em uma única exposição, também chamada de “exposição panorâmica”.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('90af8700-98d2-4b15-8e48-440d0cef5f99', '53fb8c0a-bff0-44db-b283-816f405cd4ac', 'E) Sua emissão é do tipo “esférica” a partir da fonte.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4eccc856-e141-4c22-b518-6ef55fe702eb', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 26', 'Resolva a questão', 25)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('92da0af9-309b-4096-b028-88b9426d6dd9', '934dd4d4-5b4c-471d-bd3c-48439579194c', '4eccc856-e141-4c22-b518-6ef55fe702eb', 'multiple_choice', 'Quanto aos “Indicadores de Qualidade de Imagem”(IQI) relativos ao Ensaio Radiográfico, assinale a alternativa incorreta. ', 'A alternativa correta é a letra A', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b029f796-1206-4c8a-a00b-aa194d764a81', '92da0af9-309b-4096-b028-88b9426d6dd9', 'A) A sensibilidade radiográfica estabelecida pelo código ASME em relação ao seu IQI-padrão está definida em função do furo de maior diâmetro visível na radiografia.', true, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b26a0190-f9da-49fe-a4da-d9aeec7c4ba8', '92da0af9-309b-4096-b028-88b9426d6dd9', 'B) IQI é um dispositivo, cuja imagem registrada na radiografia é usada para determinar o nível de qualidade radiográfica.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('e786f2e6-e78d-42a7-a42e-8a5e84de4a9f', '92da0af9-309b-4096-b028-88b9426d6dd9', 'C) As diferentes espessuras encontradas em um IQI não têm a função de julgar o tamanho das descontinuidades detectadas no filme.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('cb20b51e-8124-41d4-b403-49cee9a08ba6', '92da0af9-309b-4096-b028-88b9426d6dd9', 'D) A sensibilidade radiográfica estabelecida pela norma DIN (Deutsche Industrie Normen) em relação ao seu IQI-padrão está definida em função do menor arame visível na radiografia.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('058fc31f-d6b6-4569-bc48-196860dc5989', '92da0af9-309b-4096-b028-88b9426d6dd9', 'E) As diferentes espessuras encontradas em um IQI não têm a função de estabelecer limites de aceitação das descontinuidades  detectadas no filme.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('68efdb97-ce00-45ba-b4d5-2148dda403f5', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 27', 'Resolva a questão', 26)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('30ee5a35-6715-4d60-8d61-577eebc7bf41', '934dd4d4-5b4c-471d-bd3c-48439579194c', '68efdb97-ce00-45ba-b4d5-2148dda403f5', 'multiple_choice', 'Das alternativas apresentadas a seguir, identifique aquela que não está relacionada com o ensaio “Líquido Penetrante”. ', 'A alternativa correta é a letra C', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('673dcf6a-4ccd-4498-8c6d-e73bf7b18b3a', '30ee5a35-6715-4d60-8d61-577eebc7bf41', 'A) Ensaio rápido e de fácil execução.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('08a36530-c53d-4c09-87fa-d535247beb20', '30ee5a35-6715-4d60-8d61-577eebc7bf41', 'B) Ensaio que apresenta um custo relativamente baixo.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b23e5834-103b-4399-86eb-7b7830f691be', '30ee5a35-6715-4d60-8d61-577eebc7bf41', 'C) Ensaio que apresenta uma boa sensibilidade em relação a descontinuidades localizadas próximas à superfície da peça.', true, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('9e1b1eca-8742-4eee-90e0-061125e73114', '30ee5a35-6715-4d60-8d61-577eebc7bf41', 'D) Ensaio que pode ser realizado em materiais magnéticos e não magnéticos.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('b6162b49-dd95-47de-a093-157efb6991b8', '30ee5a35-6715-4d60-8d61-577eebc7bf41', 'E) Para o treinamento de operadores e inspetores, este ensaio requer menor tempo comparado aos outros tipos de ensaios não destrutivos.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('4f04e864-2166-4a6f-b93c-043fabdef2ae', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 28', 'Resolva a questão', 27)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('d0b6a9b5-6c7d-4901-ba30-df40636a8ab0', '934dd4d4-5b4c-471d-bd3c-48439579194c', '4f04e864-2166-4a6f-b93c-043fabdef2ae', 'multiple_choice', 'Em relação às vantagens e desvantagens referentes ao Ensaio por Líquido Penetrante, identifique a alternativa incorreta. ', 'A alternativa correta é a letra D', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('0d8d4505-1757-44e3-905c-ee482bfe8c50', 'd0b6a9b5-6c7d-4901-ba30-df40636a8ab0', 'A) Uma vantagem deste ensaio é poder detectar descontinuidades superficiais muito pequenas.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('20e77ab0-5c9a-4d83-9f8d-7c16dacf00e6', 'd0b6a9b5-6c7d-4901-ba30-df40636a8ab0', 'B) Uma desvantagem deste ensaio é que este só detecta descontinuidades abertas para a superfície e que não estejam obstruídas.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('72ed303f-f5ea-41ba-afe9-38024312ad5a', 'd0b6a9b5-6c7d-4901-ba30-df40636a8ab0', 'C) Uma vantagem deste ensaio é que a forma da peça, ou da região onde será ensaiada, não é um problema.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('140468ec-930a-4316-bb4f-7bb08c5ed49b', 'd0b6a9b5-6c7d-4901-ba30-df40636a8ab0', 'D) Uma desvantagem deste ensaio é que este aplica-se somente a materiais ferromagnéticos.', true, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('7b1ad7c8-6a66-4fe7-b1fc-37ecb0f875de', 'd0b6a9b5-6c7d-4901-ba30-df40636a8ab0', 'E) Uma vantagem deste ensaio é que este pode ser realizado em superfícies planas ou curvas.', false, 5)
ON CONFLICT DO NOTHING;

INSERT INTO public.lesson_steps (id, lesson_id, step_type, title, content, position) VALUES
('64fe2bc2-f7b0-4f5f-b6f9-642e6f4bb3cc', '934dd4d4-5b4c-471d-bd3c-48439579194c', 'activity', 'Questão 29', 'Resolva a questão', 28)
ON CONFLICT DO NOTHING;

INSERT INTO public.activities (id, lesson_id, lesson_step_id, activity_type, statement, explanation, points, position) VALUES
('b86f28d9-1b85-4d29-983e-3347f4b421fe', '934dd4d4-5b4c-471d-bd3c-48439579194c', '64fe2bc2-f7b0-4f5f-b6f9-642e6f4bb3cc', 'multiple_choice', 'Em relação ao Ensaio não destrutivo “Partículas Magnéticas”, identifique a única alternativa que não é uma desvantagem ou limitação referente a este ensaio. ', 'A alternativa correta é a letra E', 10, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('6589513b-f832-480d-a3ed-4f5fd5ad1c84', 'b86f28d9-1b85-4d29-983e-3347f4b421fe', 'A) Ensaio destinado apenas a materiais ferromagnéticos.', false, 1)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('4e92ba93-c8ad-40cd-9987-c5e73937e891', 'b86f28d9-1b85-4d29-983e-3347f4b421fe', 'B) A inspeção de áreas com materiais de características magnéticas muito diferentes dificulta bastante a qualidade da inspeção.', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('c9b25137-5ad3-47b9-8cba-9d607dff2e29', 'b86f28d9-1b85-4d29-983e-3347f4b421fe', 'C) A geometria da peça pode dificultar, ou mesmo tornar a inspeção não confiável, como também impossibilitar a execução do ensaio.', false, 3)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('a7d8139a-3738-449d-932f-5d7a4356c5bf', 'b86f28d9-1b85-4d29-983e-3347f4b421fe', 'D) Ensaio que não permite o registro permanente dos resultados obtidos.', false, 4)
ON CONFLICT DO NOTHING;

INSERT INTO public.activity_options (id, activity_id, content, is_correct, position) VALUES
('db60bd1a-5af2-4474-a378-4874aeb40b60', 'b86f28d9-1b85-4d29-983e-3347f4b421fe', 'E) Ensaio que necessita de acesso a ambas as superfícies da peça que será analisada.', true, 5)
ON CONFLICT DO NOTHING;

