(defproject earthquaker "0.1.0-SNAPSHOT"
  :description "REST API for RethinkDB Earthquake data"
  :url "https://github.com/baumandm/rethink-earthquakes"
  :min-lein-version "2.0.0"
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [compojure "1.2.0"]
                 [ring/ring-defaults "0.1.2"]
                 [ring/ring-json "0.3.1"]
                 [revise "0.1.1-SNAPSHOT"]]
  :plugins [[lein-ring "0.8.13"]]
  :ring {:handler earthquaker.core.handler/app}
  :profiles
  {:dev {:dependencies [[javax.servlet/servlet-api "2.5"]
                        [ring-mock "0.1.5"]]}})
