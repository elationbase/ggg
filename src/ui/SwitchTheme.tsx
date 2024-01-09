import { Label } from '@/ui/form';
import { IconMoon, IconSun } from '@/ui/icons';
import { Switch } from '@nextui-org/react';
import { useEffect, useState } from 'react';

export function SwitchTheme() {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') ?? 'light');

  const onChange = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <>
      <Label text="Selected Color Mode" />
      <Switch
        onValueChange={onChange}
        isSelected={theme === 'dark'}
        size="lg"
        color="secondary"
        thumbIcon={() =>
          theme === 'dark' ? <IconMoon size={16} color="black" /> : <IconSun size={16} />
        }>
        Dark mode
      </Switch>
    </>
  );
}
