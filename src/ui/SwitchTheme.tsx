import { Switch } from '@nextui-org/react';
import { Label } from '@ui/form';
import { IconMoon, IconSun } from '@ui/icons';
import { useState } from 'react';

export function SwitchTheme() {
  const [darkMode, setDarkMode] = useState(true);
  const onChange = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };
  return (
    <>
      <Label text="Selected Color Mode" />
      <Switch
        onValueChange={onChange}
        isSelected={darkMode}
        size="lg"
        color="secondary"
        thumbIcon={() => (darkMode ? <IconMoon size={16} color="black" /> : <IconSun size={16} />)}>
        Dark mode
      </Switch>
    </>
  );
}
