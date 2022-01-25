import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
	return (
		<div className='footerContainer'>
			<div className='footerLinks'>
				<div className='footerLinkWrapper'>
					<div className='footerlinkItems'>
						<h2>Contact Us </h2>
						<h4>JLMARS@dev.com</h4>
						<h4>0555555523</h4>
					</div>
					<div className='footerlinkItems'>
						<h2>Social Media</h2>
						<Link to={{ pathname: '//facebook.com' }} target='_blank'>
							Facebook
						</Link>
						<Link to={{ pathname: '//instagram.com' }} target='_blank'>
							Instagram
						</Link>
						<Link to={{ pathname: '//twitter.com' }} target='_blank'>
							Twitter
						</Link>
					</div>
				</div>
				<div className='footerlinkItems'>
					<h2>Legal</h2>
					<Link to='/Terms'>Terms</Link>
					<Link to='/Privacy'>Privacy</Link>
				</div>
			</div>
			<section className='socialMedia'>
				<div className='socialWrap'>
					<Link to='/' className='socialLogo'>
						Read-it
						{/* Read-it <i className='fas fa-globe-europe'></i> */}
					</Link>

					<small className='websiteRights'>Read-it © 2022 </small>
					<div className='socialIcons'>
						<Link className='socialFacebook' to={{ pathname: '//facebook.com' }} target='_blank' aria-label='Facebook'>
							<i className='fab fa-facebook-f' />
						</Link>
						<Link className='socialInsta' to={{ pathname: '//instagram.com' }} target='_blank' aria-label='Instagram'>
							<i className='fab fa-instagram' />
						</Link>
						<Link className='socialTwitter' to={{ pathname: '//twitter.com' }} target='_blank' aria-label='Twitter'>
							<i className='fab fa-twitter' />
						</Link>
					</div>
				</div>
			</section>
		</div>
	)
}

export default Footer
