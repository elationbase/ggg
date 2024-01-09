import { TEXT } from '@/lib/i18n';
import { ROUTE_CLIENT } from '@/lib/routes';
import { IconContact, IconCreate, IconDashboard, IconUser } from '@/ui';

type FooterNavItemProps = {
  icon: JSX.Element;
  label: string;
  href: string;
  isActive: boolean;
};

function FooterNavItem({ icon, label, href, isActive }: FooterNavItemProps) {
  if (isActive) {
    return (
      <div className="flex-1 group">
        <div className="flex flex-col items-center justify-center mx-auto px-4 py-2 w-full text-green-700">
          {icon}
          <span className="block text-xs pb-1">{label}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 group">
      <a
        href={href}
        className="flex flex-col items-center justify-center mx-auto px-4 py-2 w-full text-gray-400 group-hover:text-green-500">
        {icon}
        <span className="block text-xs pb-1">{label}</span>
      </a>
    </div>
  );
}

export function FooterNav({ currentPath }: { currentPath: string }) {
  return (
    <nav className="flex">
      <FooterNavItem
        href={ROUTE_CLIENT.dashboard}
        label={TEXT.footer.dashboard}
        isActive={currentPath === ROUTE_CLIENT.dashboard}
        icon={<IconDashboard />}
      />
      <FooterNavItem
        href={ROUTE_CLIENT.createGame}
        label={TEXT.footer.create}
        isActive={currentPath === ROUTE_CLIENT.createGame}
        icon={<IconCreate />}
      />
      <FooterNavItem
        href={ROUTE_CLIENT.contacts}
        label={TEXT.footer.contacts}
        isActive={currentPath === ROUTE_CLIENT.contacts}
        icon={<IconContact />}
      />
      <FooterNavItem
        href={ROUTE_CLIENT.account}
        label={TEXT.footer.account}
        isActive={currentPath === ROUTE_CLIENT.account}
        icon={<IconUser />}
      />
    </nav>
  );
}
