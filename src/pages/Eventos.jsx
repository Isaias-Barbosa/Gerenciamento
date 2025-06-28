import React from 'react';
import Footer from '../components/Footer';

const eventos = [
	{
		title: 'Casamentos à Beira-Mar',
		image:
			'https://cdn0.casamentos.com.br/vendor/6604/3_2/960/jpeg/whatsapp-image-2022-03-31-at-11-29-32_13_356604-164876214223839.jpeg',
		desc: 'Celebre seu casamento com vista para o mar, cardápio personalizado e estrutura completa.',
	},
	{
		title: 'Eventos Corporativos',
		image:
			'https://www.maggioreeventos.com.br/wp-content/uploads/2019/11/evento-corporativo-1.jpg',
		desc: 'Ambiente sofisticado para reuniões, confraternizações e lançamentos de produtos.',
	},
	{
		title: 'Aniversários e Festas',
		image:
			'https://restauranteterraemar.com.br/wp-content/uploads/2023/05/Aniversario-de-crianca.jpg',
		desc: 'Festas inesquecíveis com buffet variado, decoração e música ao vivo.',
	},
	{
		title: 'Eventos Personalizados',
		image:
			'https://www.estilozzo.com/wp-content/uploads/2022/08/Eventos-Living-HNK-Brasilia_B.ase-Films.jpg',
		desc: 'Montamos o evento do seu jeito: escolha o tema, cardápio e estrutura.',
	},
];

export default function Eventos() {
	return (
		<div
			style={{
				minHeight: '100vh',
				background: 'linear-gradient(135deg, #23272f 0%, #18181b 100%)',
				fontFamily: 'Segoe UI, Arial, sans-serif',
				paddingTop: 0,
			}}
		>
			<div style={{ maxWidth: 1000, margin: '0 auto', padding: '6vh'}}>
				<div
					style={{
		             width: '100%',
            maxWidth: 1000, 
            height: 370, 
            objectFit: 'cover',
             borderRadius: 24, 
             boxShadow: '0 4px 32px #0006',
              margin: '0 auto 28px auto',
              display: 'block',
					}}
				>
					<img
						src="https://buenascarnes.com.br/wp-content/uploads/2024/10/blog-organizando-eventos-corporativos-como-escolher-o-restaurante-ideal.jpg"
						alt="Ambiente interno do restaurante"
						style={{
							width: '100%',
							height: 400,
							objectFit: 'cover',
              
              top: 0,
							borderRadius: 24,
							boxShadow: '0 4px 32px #0006',
						}}
					/>
					<h1
						style={{
							position: 'absolute',
							top: '37%',
							left: '50%',
							transform: 'translate(-50%, -50%)',
							color: '#fff',
							fontSize: 38,
							fontWeight: 900,
							letterSpacing: 5,
							marginBottom: 12,
							background: 'rgba(24,24,27,0.75)',
							borderRadius: 24,
							padding: '20px 80px',
							textAlign: 'center',
							boxShadow: '0 2px 16px #0006',
							border: 'none',
							textShadow: '0 2px 12px #0008',
						}}
					>
						Eventos
					</h1>
				</div>
				<p
					style={{
						color: '#fff',
						fontSize: 20,
						textAlign: 'center',
            position: 'relative',
            padding: '10vh 1px',
						marginBottom: 48,
						maxWidth: 1000,
						marginLeft: 'auto',
						marginRight: 'auto',
					}}
				>
					Realize seu evento conosco! Estrutura completa, gastronomia de alto
					padrão e uma vista inesquecível. Confira alguns tipos de eventos que
					organizamos:
				</p>
				<div
					style={{
						display: 'grid',
						gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
						gap: 40,
					}}
				>
					{eventos.map((ev, i) => (
						<div
							key={i}
							style={{
								background: '#fff',
								borderRadius: 18,
								boxShadow: '0 4px 24px #0002',
								padding: 0,
								overflow: 'hidden',
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								border: '1.5px solid #e0e0e0',
							}}
						>
							<img
								src={ev.image}
								alt={ev.title}
								style={{
									width: '100%',
									height: 200,
									objectFit: 'cover',
								}}
							/>
							<div
								style={{
									padding: 38,
									flex: 1,
									display: 'flex',
									flexDirection: 'column',
									justifyContent: 'center',
								}}
							>
								<h2
									style={{
										color: '#27548A',
										fontSize: 26,
										fontWeight: 700,
										marginBottom: 12,
										textAlign: 'center',
									}}
								>
									{ev.title}
								</h2>
								<p
									style={{
										color: '#23272f',
										fontSize: 18,
										textAlign: 'center',
									}}
								>
									{ev.desc}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
			<Footer />
		</div>
	);
}
