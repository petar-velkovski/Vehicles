<template>
  <v-app id="inspire" class="grey lighten-4">
    <v-navigation-drawer
    v-model="drawer"
    dark
    app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Vehicle App
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
          link
          
        >

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app dark>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Vehicle App</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        items: [
          { title: 'Vehicle Form', to:'/form'},
          { title: 'Vehicle Grid', to: '/grid' },
        ],
        right: null,
        drawer: null
      }
    },
  }
</script>

