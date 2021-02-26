class SubscriptionsController{
    async show(req,res){
         if(req.method =='POST'){
            const stripe = require('stripe')('sk_test_51IFNI3FE7L6PooyOGAzASERoWwR46gAfXZjE2gb88oKcVwQwhpuYAHOgeOoQqCGuOTVjHgSxeb3Ng4cMgPFcKChx00R9zXVduh');

            const customer = await stripe.customers.create({
                email:req.body.email,
                source: req.body.stripeToken,
              description: 'Test stripeToken',
            });
            
            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [
                  {price: req.body.plan},
                ],
              });

            //   if(subscription.status === 'active'){
            //       // todo store in database
            //   }
            res.send(`<pre>${JSON.stringify(req.body,null,2)}</pre><br/><pre>${JSON.stringify(subscription,null,2)}</pre>`)
         }else{
            res.render("subscriptions/show")
         }
    }
}
 module.exports = new SubscriptionsController()