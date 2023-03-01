import { Link } from 'react-router-dom';

import AdditionalResidentSvg from './sidebar/AdditionalResidentSvg';
import AdminsSvg from './sidebar/AdminsSvg';
import ApprovalsSvg from './sidebar/ApprovalsSvg';
import ArtisanSvg from './sidebar/ArtisanSvg';
import EnergyTokenSvg from './sidebar/EnergyTokenSvg';
import EstateManagerSvg from './sidebar/EstateManagerSvg';
import EstatesSvg from './sidebar/EstatesSvg';
import MessageSvg from './sidebar/MessageSvg';
import OverviewSvg from './sidebar/overviewSvg';
import PaymentsSvg from './sidebar/PaymentsSvg';
import ReportsSvg from './sidebar/ReportsSvg';
import RolesAndPermSvg from './sidebar/RolesAndPermSvg';
import SecurityCompSvg from './sidebar/SecurityCompSvg';
import SettingsSvg from './sidebar/SettingsSvg';
import WalletSvg from './sidebar/WalletSvg';

function IconsBox() {
  return (
      <ul className='iconsBox'>
          <li className='iconsBox__list'>
              <Link to='/estateManager'>
                  <OverviewSvg />
                  <span>Overview</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/wallet' className='fillIcon'>
                  {' '}
                  <WalletSvg />
                  <span>Wallet</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/residents'>
                  <AdminsSvg />
                  <span>Residents</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/property' className='fillIcon'>
                  {' '}
                  <EstatesSvg />
                  <span>Properties</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/household' className='fillIcon'>
                  {' '}
                  <EstateManagerSvg />
                  <span>Household</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/estate-staff'>
                  <RolesAndPermSvg />
                  <span>Estate Staff</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/site-worker'>
                  {' '}
                  <AdditionalResidentSvg />
                  <span>Site Worker</span>{' '}
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/security-guard' className='fillIcon'>
                  {' '}
                  <SecurityCompSvg />
                  <span>Security Guard</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/artisan' className='fillIcon'>
                  {' '}
                  <ArtisanSvg />
                  <span>Artisan</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/wallet' className='fillIcon'>
                  <WalletSvg />
                  <span>Wallet</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/message'>
                  <MessageSvg />
                  <span>Message</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/payments'>
                  <PaymentsSvg />
                  <span>Payments</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/energy-token'>
                  <EnergyTokenSvg />
                  <span>Energy Token</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/reports'>
                  <ReportsSvg />
                  <span>Reports</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/approvals'>
                  <ApprovalsSvg />
                  <span>Approvals</span>
              </Link>
          </li>
          <li className='iconsBox__list'>
              <Link to='/estateManager/rules-and-regulations' className='fillIcon'>
                  <SettingsSvg />
                  <span>Estate Rules and Regulations</span>
              </Link>
          </li>
      </ul>
  )
}

export default IconsBox;
