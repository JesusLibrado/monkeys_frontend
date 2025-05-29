'use client'
import { SessionProvider } from 'next-auth/react'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import { DEFAULT_PAGE_TITLE } from '@/context/constants'
import { ChildrenType } from '@/types/component-props'
import dynamic from 'next/dynamic'
import { ChatProvider } from '@/context/useChatContext'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const LayoutProvider = dynamic(() => import('@/context/useLayoutContext').then((mod) => mod.LayoutProvider), {
  ssr: false,
})

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  const handleChangeTitle = () => {
    if (document.visibilityState == 'hidden') document.title = 'Sistema Monkeys'
    else document.title = DEFAULT_PAGE_TITLE
  }

  useEffect(() => {
    if (document) {
      const e = document.querySelector<HTMLDivElement>('#__next_splash')
      if (e?.hasChildNodes()) {
        document.querySelector('#splash-screen')?.classList.add('remove')
      }
      e?.addEventListener('DOMNodeInserted', () => {
        document.querySelector('#splash-screen')?.classList.add('remove')
      })
    }

    document.addEventListener('visibilitychange', handleChangeTitle)
    return () => {
      document.removeEventListener('visibilitychange', handleChangeTitle)
    }
  }, [])

  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <LayoutProvider>
          <ChatProvider>
            {/* <TitleProvider> */}
            {/* <NotificationProvider> */}
            {children}
            <ToastContainer theme="colored" />
            {/* </NotificationProvider> */}
            {/* </TitleProvider> */}
          </ChatProvider>
        </LayoutProvider>
      </SessionProvider>
    </ApolloProvider>
      
  )
}
export default AppProvidersWrapper
