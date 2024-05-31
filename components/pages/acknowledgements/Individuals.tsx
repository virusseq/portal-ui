/*
 *
 * Copyright (c) 2022 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

import { ReactElement } from 'react';
import { css, useTheme } from '@emotion/react';

import defaultTheme from '../../theme';

const Individuals = (): ReactElement => {
	const theme: typeof defaultTheme = useTheme();
	return (
		<section
			css={css`
				margin: 5px 0 0;
			`}
		>
			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				Canadian Public Health Laboratory Network (CPHLN) members and staffs having contributed data
				to the portal
			</h2>

			<h3>Alberta</h3>

			<p>
				<em>Genomes with prefix ABPHL</em>
				<br />
				Bu J, Croxen M, Deo A, Dieu P, Dong X, Ferrato C, Gavriliuc S, George R, Getachew F, Gill,
				K, Ie N, Khadka R, Khan F, Koleva P, Lee L, Li V, Lindsay A, Lloyd C, Lynch T, Ma R,
				McCullough, E, Mohon A, Murphy S, Obasuyi O, Pabbaraju K, Presbitero A, Rotich S, Shokoples
				S, Thayer J, Tipples G, Trevor H, Whitehouse M, Wong A, Yu C, Zelyas N
			</p>

			<p>
				<em>Genomes in collaboration with UC (prefix AB-NNNNNN)</em>
				<br />
				Gordon P, Lam LG, Pabbaraju K, Wong A, Ma R, Li V, Melin A, Tipples G, Berenger B, Zelyas N,
				Kellner J, Bernier F, Chui L, Croxen M
			</p>

			<h3>British Columbia</h3>

			<p>
				<em>BCCDC Public Health Laboratory</em>
				<br />
				Prystajecky Natalie, Linda Hoang, John R. Tyson, James Zlosnik, Dan Fornika, Shannon
				Russell, Kim MacDonald, Kimia Kamelian, Ana Pacagnella, Corrinne Ng, Loretta Janz, Richard
				Harrigan, Robert Azana, Tara Newman, Jessica Caleta, Sherrie Wang, Janet Fung, Mel Krajden
			</p>

			<h3>Manitoba</h3>

			<p>
				<em>
					Cadham Provincial Laboratory collected specimens sequenced at the National Microbiology
					Lab (NML)
				</em>
				<br /> Paul Van Caeseele, Jared Bullard, David Alexander, Kerry Dust
			</p>

			<p>
				<em>NML</em>
			</p>

			<p>
				<em>Cadham Provincial Laboratory sequenced specimens</em>
				<br />
				David Alexander, Lori Johnson, Janna Holowick, Joanne Sanders, Adam Hedley, Kerry Dust, Ayo
				Bolaji, Brooke Cistarelli, Emma Rempel, Paul van Caeseele, Jared Bullard.
			</p>

			<p>
				<em>Dynacare sequenced specimens</em>
				<br />
				Hilary Racher, Melissa Desaulnier, Tintu Abraham, Hongbin Li (Impact Genetics, Brampton
				Ontario)
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>New Brunswick</h3>

			<p>
				<em>Centre Hospitalier Universitaire Georges L. Dumont</em>
				<br />
				Beauregard AP., Lyons P., Chacko S., Shaw W., Lacroix J., Allain E., Crapoulet N., Garceau
				R., Desnoyers G.
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>Newfoundland and Labrador</h3>

			<p>
				<em>
					Newfoundland and Labrador Health Services
					<br /> (previously known as "Newfoundland and Labrador - Eastern Health")
				</em>
				<br />
				Robert Needle, Yang Yu, Laura Gilbert, George Zahariadis, Geoffrey Woodland, Chris Corkum,
				Kerri Smith, Phillip Andrews, Matthew Gilmour
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>Nova Scotia</h3>

			<p>
				<em>QEII Health Sciences Centre*</em>
				<br />
				Todd Hatchette, Jason LeBlanc, Janice Pettipas, Dan Gaston, Greg McCracken.
				<br />
				(*data tagged post September 14th should include Allana Loder)
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>Ontario</h3>

			<p>
				<em>Public Health Ontario Laboratory</em>
				<br />
				Jacob Afelskie, Vanessa G Allen, Rebecca Azzaro, Doonia Bajovic, Philip Banh, Ilse Belgrave,
				Tom Braukmann, Ashley Carandang, Yao Chen, Claudia Chu, Shawn Clark, Kirby Cronin, Richard
				de Borja, Rachelle DiTullio, Carla Duncan, Hadi El Roz, Alireza Eshaghi, Nahuel Fittipaldi,
				Christine Frantz, Dhiraj Gaglani, Nicole Graham, Jonathan B Gubbay, Jennifer L Guthrie,
				Lawrence Heisler, Daniel Heydari, Mark Horsman, Hadia Hussain, Jason Iraheta, Grace Jeong,
				Esha Joshi, Sushma Kavikondala, Lisa Kim, Surendra Kumar, Michael Laszloffy, Aimin Li,
				Michael C.Y. Li, Alex Marchand-Austin, Maria Mariscal, Dean Maxwell, Lisa McTaggart, Fatima
				Merza, Anupam Mittal, Naadia Mohammed, Esther Nagai, Sandeep Nagra, Shiva Nassori, Paul
				Nelson, Rima Palencia, John Palmer, Samir N Patel, Stephen Perusini, Nataliya Potapova, Anna
				Puzinovici, Zarah Rajaei, Christina Rampertab, Himeshi Samarsinghe, Candice Schreiber,
				Christine Seah, Fatemeh Shaeri, Kapil Shaeri, Kapil Shah, Narisha Shakuralli, Natasha Singh,
				Karthikeyan Sivaraman, Brenda Stanghini, Ashleigh Sullivan, Vincent Su Bin Cha, Yogi
				Sundaravadanam, Sarah Teatero, Semra Tibebu, Nobish Varghese, Andre Villegas, Jesse Wang,
				Matthew Watson, Sichong Xu, Xiao Xu, Kent Young, Sophie Yu, Farhan Yusuf, Sandra Zittermann
			</p>

			<p>
				<em>Ontario Institute for Cancer Research</em>
				<br />
				Jared T. Simpson, Richard de Borja, Paul Krzyzanowski, Bernard Lam, Lawrence Heisler,
				Michael Laszloffy, Yogi Sundaravadanam, Ilinca Lungu, Lubaina Kothari, Cassandra Bergwerff,
				Jeremy Johns, Felicia Vincelli, Philip Zuzarte
			</p>

			<p>
				<em>McMaster University</em>
				<br />
				Hooman Derakhshani, Sheridan J.C. Baker, Emily M. Panousis, Ahmed N. Draia, Jalees A. Nasir,
				Michael G. Surette, Andrew G. McArthur
			</p>

			<h3>Prince Edward Island</h3>

			<p>
				<em>Queen Elizabeth Hospital</em>
				<br />
				Xiaofeng Ding, Vanessa Arseneau, Kari-Lyn Young
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>Québec</h3>

			<p>
				<em>
					Laboratoire de Santé Publique du Québec, McGill Génome Sciences Centre; CoVSeq Consortium
				</em>
				<br />
				Sandrine Moreira, Jiannis Ragoussis, Guillaume Bourque, Éric Fournier, Aurélie Guilbault,
				Benjamin Delisle, Dihya Baloul, Inès Levade, Sarah Reiling, Hector Galvez, Paul
				Stretenowich, Alexandre Montpetit, Michel Roger, Judith Fafard
			</p>

			<h3>Saskatchewan</h3>

			<p>
				<em>Roy Romanow Provincial Laboratory</em>
				<br />
				Ryan McDonald, Keith MacKenzie, Kara Loos, Stefani Kary, Meredith Faires, Guruprasad Janga,
				Rachel DePaulo, Laura Klassen, Alanna Senecal, Amanda Lang, Jessica Minion, Roy Romanow
				Provincial Laboratory - Molecular Diagnostics.
			</p>

			<p>
				<em>NML</em>
			</p>

			<h3>Canada's National Microbiology Laboratory (NML)</h3>

			<p>
				Anna Majer, Shari Tyson, Grace Seo, Philip Mabon, Elsie Grudeski, Rhiannon Huzarewich,
				Russell Mandes, Anneliese Landgraff, Jennifer Tanner, Natalie Knox, Morag Graham, Gary Van
				Domselaar, Nathalie Bastien, Ruimin Gao, Cody Buchanan, Jasmine Frost, Ameet Bharaj, Cole
				Slater, Nikki Toledo, Laura Hart, Yan Li, Timothy Booth, Catherine Yoshida, Genevieve Labbe,
				Adina Bujold, Kara Loos, Jennifer Beirnes, Michael Przybytkowski, Patrick Bastedo, Debra
				Sorensen, Andrea Tyler, Ana Duggan, Darian Hole, Madison Chapel, Kristen Biggar, Emily
				Haidl, Chanchal Yadav, Jeff Tuff, Connor Chato, Katherine Eaton, Kirsten Palmier, Molly
				Pratt, Amber Papineau and Adrian Zetner.
			</p>

			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				Academic, Health Network and Research Institutions staffs having contributed data to the
				portal
			</h2>

			<p>
				<em>Unity Health Toronto</em>
				<br />
				Ramzi Fattouh, Larissa M. Matukas, Yan Chen, Mark Downing, Trina Otterman, Karel Boissinot,
				Le Luu
			</p>

			<p>
				<em>University Health Network/Mount Sinai Hospital Department of Microbiology</em>
				<br />
				Marie-Ming Aynaud, Javier Hernandez, Seda Barutcu, Kin Chan, Jessica Bourke, Marc Mazzulli,
				Tony Mazzulli, Laurence Pelletier, Jeff Wrana, Aimee Paterson, Angel Liu, Allison McGeer
			</p>

			<p>
				<em>Kingston Health Sciences Centre and Queen’s University</em>
				<br />
				Prameet M. Sheth, Calvin Sjaarda, Robert Colautti, Katya Douchant
			</p>

			<p>
				<em>University of British Columbia</em>
				<br />
				John R. Tyson, Gabrielle Jayme, Karen Jones, Terrance P. Snutch
			</p>

			<p>
				<em>Toronto Invasive Bacterial Diseases Network; Sunnybrook Health Sciences</em>
				<br />
				Allison McGeer, Patryk Aftanas, Angel Li, Kuganya Nirmalarajah, Emily Panousis, Ahmed Draia,
				Jalees Nasir, David Richardson, Michael Surette, Samira Mubareka, Andrew G. McArthur
			</p>

			<p>
				<em>Eastern Ontario Regional Laboratory Association</em>
				<br />
				Leanne Mortimer, Hooman Derakhshani, Emily Panousis, Ahmed Draia, Jalees Nasir, Robert
				Slinger, Andrew G. McArthur
			</p>

			<h2
				css={css`
					${theme.typography.subheading};
				`}
			>
				CanCOGeN VirusSeq committees and working groups’ members
			</h2>

			<p>
				<em>CanCOGeN VirusSeq Implementation Committee</em>
				<br />
				Terrance Snutch, Fiona Brinkman, Marceline Côté, William Hsiao, Yann Joly, Sharmistha
				Mishra, Sandrine Moreira, Samira Mubareka, Jared Simpson, Megan Smallwood, Gary Van
				Domselaar, Cindy Bell, Catalina López-Correa
			</p>

			<p>
				<em>CanCOGeN Capacity Building Working Group</em>
				<br />
				Gary Van Domselaar, Matthew Croxen, Natalie Knox, Celine Nadon, Jennifer Tanner
			</p>

			<p>
				<em>CanCOGeN Data Analytics Working Group</em>
				<br />
				Gary Van Domselaar, Fiona Brinkman, Zohaib Anwar, Robert Beiko, Matieu Bourgey, Guillaume
				Bourque, Richard de Borja, Ahmed Draia, Jun Duan, Marc Fiume, Dan Fornika, Eric Fournier,
				Erin Gill, Paul Gordon, Emma Griffiths, José Héctor Gálvez López, Darian Hole, William
				Hsiao, Jeffrey Joy, Kimia Kamelian, Natalie Knox, Philip Mabon, Finlay Maguire, Tom
				Matthews, Andrew McArthur, Samir Mechai, Sandrine Moreira, Art Poon, Amos Raphenya, Claire
				Sevenhuysen, Jared Simpson, Jennifer Tanner, Lauren Tindale, John Tyson, Geoff Winsor, Nolan
				Woods
			</p>

			<p>
				<em>CanCOGeN Ethics and Governance Working Group</em>
				<br />
				Yann Joly, Fiona Brinkman, Erin Gill, William Hsiao, Hanshi Liu, Sandrine Moreira, Gary Van
				Domselaar, Ma’n Zawati, Sarah Savić-Kallesøe
			</p>

			<p>
				<em>CanCOGeN Metadata Working Group</em>
				<br />
				William Hsiao, David Alexander, Zohaib Anwar, Nathalie Bastien, Tim Booth, Guillaume
				Bourque, Fiona Brinkman, Hughes Charest, Caroline Colijn, Matthew Croxen, Guillaume
				Desnoyers, Rejean Dion, Damion Dooley, Ana Duggan, Leah Dupasquier, Kerry Dust, Eleni
				Galanis, Emma Garlock, Erin Gill, Gurinder Gopal, Tom Graefenhan, Morag Graham, Emma
				Griffiths, Linda Hoang, Naveed Janjua, Jeffrey Joy, Kimia Kamelian, Lev Kearney, Natalie
				Knox, Theodore Kuschak, Jason LeBlanc, Yan Li, Anna Majer, Adel Malek, Ryan McDonald, David
				Moore, Celine Nadon, Samir Patel, Natalie Prystajecky, Anoosha Sehar, Claire Sevenhuysen,
				Garrett Sorensen, Laura Steven, Lori Strudwick, Marsha Taylor, Shane Thiessen, Gary Van
				Domselaar, Adrian Zetner
			</p>

			<p>
				<em>CanCOGeN Research Collaborations Working Group</em>
				<br />
				Fiona Brinkman, Zohaib Anwar, Marceline Côté, Marc Fiume, Laura Gilbert, Erin Gill, Paul
				Gordon, Yann Joly, Sandrine Moreira, Samira Mubareka, Natalie Prystajecky, Jennifer Tanner,
				Gary Van Domselaar, Phot Zahariadis,
			</p>

			<p>
				<em>CanCOGeN Sequencing Working Group</em>
				<br />
				Ioannis Ragoussis, Terrance Snutch, Patryk Aftanas, Matthew Croxen, Hooman Derakhshani,
				Nahuel Fittipaldi, Morag Graham, Andrew McArthur, Sandrine Moreira, Samira Mubareka, Natalie
				Prystajecky, Ioannis Ragoussis, Jared Simpson, Michael Surette, John Tyson
			</p>

			<p>
				<em>CanCOGeN Quality Control Working Group</em>
				<br />
				Jared Simpson, Mathieu Bourgey, Kodjovi Dodji Mlaga, Nahuel Fittipaldi, José Héctor Gálvez
				López, Natalie Knox, Genevieve Labbe, Pierre Lyons, Philip Mabon, Finlay Maguire, Anna
				Majer, Andrew McArthur, Ryan McDonald, Sandrine Moreira, Natalie Prystajecky, Karthikeyan
				Sivaraman, Kerri Smith, Terrance Snutch, Karthikeyan Sivaraman Andrea Tyler, John Tyson,
				Gary Van Domselaar
			</p>

			<p>
				<em>Canadian VirusSeq Data Portal (CVDP) Team</em>
				<br />
				Guillaume Bourque, Lincoln Stein, Christina Yung, Hanshi Liu, Yann Joly, Adrielle Houweling,
				William Hsiao, Marc Fiume, David Bujold, Erin Gill, Fiona Brinkman, Nithu John, Rosita
				Bajari, Linda Xiang, Alexandru Lepsa, Jaser Uddin, Justin Richardsson, Leonardo Rivera
			</p>
		</section>
	);
};

export default Individuals;
