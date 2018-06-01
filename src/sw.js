/* global self, workbox, clients */
workbox.skipWaiting()
workbox.clientsClaim()

workbox.precaching.precacheAndRoute(self.__precacheManifest)

// /////////////////////
// PUSH NOTIFICATIONS //
// /////////////////////

self.addEventListener('notificationclick', function (event) {
  const notification = event.notification
  const action = event.action

  console.log(notification)

  if (action === 'confirm') {
    console.log('Confirm clicked')
  } else {
    console.log(action)
    event.waitUntil(
      clients.matchAll().then(function (cls) {
        const client = cls.find(function (c) {
          return (c.visibilityState = 'visible')
        })

        if (notification.data && notification.data.url) {
          if (client !== undefined) {
            client.navigate(notification.data.url)
            client.focus()
          } else {
            clients.openWindow(notification.data.url)
          }
        }
      })
    )
  }
  notification.close()
})

self.addEventListener('notificationclose', function (event) {
  console.log('Notification was closed', event)
})

self.addEventListener('push', function (event) {
  console.log('Push Notification received', event)

  let data = {
    title: 'Dummy title',
    content: 'Dummy push notification as fallback',
    openUrl: '/'
  }
  if (event.data) {
    data = JSON.parse(event.data.text())
  }

  const options = {
    body: data.content,
    icon: 'assets/icons/app-icon-96x96.png',
    badge: 'assets/icons/app-icon-96x96.png',
    data: {
      url: data.openUrl
    }
  }

  event.waitUntil(self.registration.showNotification(data.title, options))
})

// //////////////////
// BACKGROUND SYNC //
// //////////////////

const showNotification = () => {
  // The content that is a must see in the notification should be part of the
  // title and the body. This is because these two settings will mostly likely
  // be shown on every device whereas the others might not. For example the
  // image might be shown on some and not shown at all on other devices.
  const options = {
    // For text under the title, set body option
    body: 'Numbers added to the database, synchronization completed!',
    // Icon appears on the right or left side of the pop-up notification
    icon: 'assets/icons/app-icon-96x96.png',
    // Image unlike icon is part of the body content
    // image: '/path_to_image',
    // Text direction (ltr is default)
    dir: 'ltr',
    // Set up for language that is BCP 47 compliant
    lang: 'en-US',
    // Vibration with pause in ms, 100ms vibration 50ms pause and then another
    // 200ms vibration and so on...
    vibrate: [100, 50, 200, 50, 100],
    // What appears as an "icon" besides the notification on the toolbar on
    // mobile devices. The badge recommended size is 96x96 and it will
    // automatically be updated into black and white color.
    badge: 'assets/icons/app-icon-96x96.png',
    // Tag acts as an id for the notification, if more than one notification
    // is sent to the device, having the same tag will make the notifications
    // stack. The latest notification will be shown last.
    tag: 'sync-notification',
    // Even if we use a tag and the same type of notification is sent to the
    // device renotify will make the device vibrate again if set to true.
    renotify: false,
    // PS: the tag and renotify as options together are like an anti spam method
    data: {
      url: '/'
    }
  }
  self.registration.showNotification('Background sync success!', options)
}

const bgSyncPlugin = new workbox.backgroundSync.Plugin('numbers-queue', {
  callbacks: {
    queueDidReplay: showNotification
    // other types of callbacks could go here
  }
})

const networkWithBackgroundSync = new workbox.strategies.NetworkOnly({
  plugins: [bgSyncPlugin]
})

// Set the google cloud functions address, ends with storeData
workbox.routing.registerRoute('', networkWithBackgroundSync, 'POST')
