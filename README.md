

 - TailWind CSS
 - daisyui and its benefits.

 - component design
 - axios
 - CORS : install cors in backend and added middleware to app.js with configuration: origin and         credentials:true
 - pass {withCredentials: true} --> while making api call.

 - Body
   # NavBar
   Route = / => # feed
   Route = /login = > login
   Route = /connections => Connections
   Route = /profile => Profile

   # Deployment

   - Sign up on AWS
   - Launch instance - select an instance type - t2.micro
   - chmod 400 <secret>.pem
   - connect to machine using ssh.
     (ssh -i "Let'sConnect-secret.pem" ubuntu@ec2-16-171-182-161.     e eu-north-1.compute.amazonaws.com)
   - Install the same node version as the project
   - Clone the repositories

   -npm run build - create a dist folder

   # Front - end
   - Installed dependencies in aws server
   - npm run build
   - sudo apt update - update the application
   - sudo apt install nginx - install the nginx package
   - sudo systemctl start nginx - starting the nginx
   - sudo systemctl enable nginx - enable nginx
   - Copy code from dist(build files) to nginx http server. (/var/www/html)
   - sudo scp -r dist/* /var/www/html/

   - Enable port :80 to make this work