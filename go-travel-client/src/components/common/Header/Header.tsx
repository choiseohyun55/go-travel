import Navigation from './Navigation'
import TopBar from './TopBar'

export function Header() {
  return (
    <header className="bg-background border-b">
      <div className="mx-auto w-full max-w-[1200px] px-6">
        <TopBar />
        <Navigation />
      </div>
    </header>
  )
}
