(ns earthquaker.core.handler
  (:require [compojure.core :refer :all]
            [compojure.route :as route]
            [compojure.handler :as handler]
            [ring.middleware.json :as middleware]
            [bitemyapp.revise.query :as r]
            [bitemyapp.revise.core :refer [run run-async]]
            [bitemyapp.revise.connection :refer [connect close]]))

(def getQuakes
  (let [connection (connect)]
    (try
      ;((-> (r/db :earthquake) (r/table-db :quakes) (r/order-by (r/desc :mag)) (r/without :geometry) (r/get ) (run connection)) :response)
      ;{:status 201 :body (-> (r/db :earthquake)
      ;     (r/table :quakes)
      ;     (r/order-by (r/desc :mag))
      ;     (r/filter (r/lambda [row] (r/>= (r/get-field row :mag) 7.0)))
      ;     (run connection)
      ;     (:response))}
      (let [result (-> (r/db :earthquake)
                       (r/table :quakes)
                       (r/order-by (r/desc :mag))
                       ;(r/filter (r/lambda [row] (r/= (r/get-field row :id) "usc000sw5b")))
                       ;(r/filter (r/lambda [row] (r/>= (r/get-field row :mag) 4.9)))
                       ; (r/filter (r/lambda [row] (r/<= (r/get-field row :gap) 100)))
                       (run connection))]
        (println result)
        (println (count (:response result)))
        {:body (first (:response result))})
      (finally (close connection)))))

(defroutes app-routes
  (GET "/" [] "Hello World")
  (GET "/quakes" [] getQuakes)
  (route/not-found "Not Found"))

(def app
  (->
      (handler/api app-routes)
      (middleware/wrap-json-response)
      ))
