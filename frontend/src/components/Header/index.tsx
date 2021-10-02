import styles from './style.module.scss';

interface HeaderProps {
  onOpenNewDeveloperModal: () => void;
}

export function Header(){
  return (
    <header className={styles.container}>
      <div>
        <h1>Developers APP</h1>
      </div>
    </header>
  )
}