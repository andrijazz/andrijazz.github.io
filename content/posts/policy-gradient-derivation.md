---
title: Policy Gradient Derivation
date: 2025-03-22
---

In this post I derive equations needed to implement basic policy gradient algorithm. I will jump straight into the equations so this post assumes you are already familiar with basic RL concepts, terminology and notation.

We start with RL objective. We would like to find $\pi_\theta$ such that it maximizes expected return $J(\pi_\theta)$.

$$
J(\pi_\theta) = E_{\tau \sim \pi_\theta} \left[ R(\tau) \right]
$$

The idea of policy gradient methods is to do gradient ascent on $J(\pi_\theta)$ to find the optimal policy. For that we need to calculate derivative of $J(\pi_\theta)$ with respect to $\theta$.

To calculate expected return, we first have to think about probability distributions over trajectories. Probability of trajectory $\tau$ under policy $\pi_\theta$ can be defined as:

$$
P(\tau | \pi) = \rho_0(s_0) \prod_{t=0}^{T - 1} P(s_{t+1} \mid s_t, a_t) \pi_\theta(a_t \mid s_t)
$$

where $\rho_0(s_0)$ is the initial state distribution, $P(s_{t+1} \mid s_t, a_t)$ is the transition probability, and $\pi_\theta(a_t \mid s_t)$ is the policy parameterized by $\theta$.

Lets now start with calculating derivative of $J(\pi_\theta)$ with respect to $\theta$ and see how it can be estimated from samples.
$$
\begin{align*}
\nabla_\theta J(\pi_\theta) = \nabla_\theta E_{\tau \sim \pi_\theta} \left[ R(\tau) \right] \\
= \nabla_\theta \int_{\tau} P(\tau | \pi_{\theta}) R(\tau) d\tau && \text{Expand expectation}\\
= \int_{\tau} \nabla_\theta P(\tau | \pi_{\theta}) R(\tau) d\tau && \text{Pull gradient inside}\\
\\
\nabla_\theta \log P(\tau | \pi_{\theta}) = \frac{1}{P(\tau | \pi_{\theta})} \nabla_\theta P(\tau | \pi_{\theta}) 
\implies \nabla_\theta P(\tau | \pi_{\theta}) = P(\tau | \pi_{\theta}) \nabla_\theta \log P(\tau | \pi_{\theta}) && \text{Log derivative trick}\\\\
\\
= \int_{\tau} P(\tau | \pi_{\theta}) \nabla_\theta \log P(\tau | \pi_{\theta}) R(\tau) d\tau \\
= E_{\tau \sim \pi_{\theta}} \left[ \nabla_\theta \log P(\tau | \pi_{\theta}) R(\tau) \right] && \text{Return to expectation form}\\
\end{align*}
$$

Now we have to see how to calculate $\nabla_\theta \log P(\tau | \pi_{\theta})$ ie derivative of log probability of trajectory $\tau$ under policy $\pi_{\theta}$.

$$
\begin{align*}
P(\tau | \pi) = \rho_0(s_0) \prod_{t=0}^{T - 1} P(s_{t+1} \mid s_t, a_t) \pi_\theta(a_t \mid s_t) && \text{By definition}\\
\log P(\tau | \pi) = \log \rho_0(s_0) + \sum_{t=0}^{T - 1}\left( \log P(s_{t+1} \mid s_t, a_t) + \log \pi_\theta(a_t \mid s_t) \right) && \text{Take log}\\
\nabla_\theta \log P(\tau | \pi) = \nabla_\theta \log \rho_0(s_0) + \sum_{t=0}^{T - 1}\left( \nabla_\theta \log P(s_{t+1} \mid s_t, a_t) + \nabla_\theta \log \pi_\theta(a_t \mid s_t) \right) && \text{Now we take derivative}\\
= \sum_{t=0}^{T - 1} \nabla_\theta \log \pi_\theta(a_t \mid s_t) && \text{Derivative is 0 when it's not a function of } \theta\\
\end{align*}
$$

Now we can plug this into our gradient ascent equation to get the final equation:

$$
\nabla_\theta J(\pi_\theta) = E_{\tau \sim \pi_{\theta}} \left[ \sum_{t=0}^{T - 1} \nabla_\theta \log \pi_{\theta}(a_t \mid s_t) R(\tau) \right]
$$
This now means that we can estimate gradient of $J(\pi_\theta)$ by sampling trajectories from $\pi_\theta$.

When implementing the algorithm the policy $\pi_\theta(a_t \mid s_t)$ is approximated with neural network. To implement the loss function we can easily take the log and multiply by reward, after we get the logits from the network and let the PyTorch auto-diff calculate the gradient.

In the code this looks like this:

```python
def get_policy_loss(self, obs, actions, returns):
    """Calculate policy loss using vanilla policy gradient."""
    obs = torch.from_numpy(obs).float().to(self.device)
    actions = torch.from_numpy(actions).long().to(self.device)
    returns = torch.from_numpy(returns).float().to(self.device)

    # Get action logits and create distribution
    logits = self.mlp(obs)
    dist = torch.distributions.Categorical(logits=logits)
    
    # Calculate log probabilities
    log_probs = dist.log_prob(actions)
    
    # Policy gradient loss is negative weighted log probabilities.
    # We take the mean across the batch.
    # The minus sign is because we are performing gradient ascent 
    # and we want to maximize the loss
    loss = -(log_probs * returns).mean()
    
    return loss
```