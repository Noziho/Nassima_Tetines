<?php

namespace App\Services;

use App\Entity\Cart;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Session\SessionInterface;

class SessionCartService
{
    private SessionInterface $session;
    private CartRepository $cartRepository;
    private EntityManagerInterface $em;

    public function __construct (RequestStack $requestStack, CartRepository $cartRepository, EntityManagerInterface $em)
    {
        $this->session = $requestStack->getCurrentRequest()->getSession();
        $this->cartRepository = $cartRepository;
        $this->em = $em;
    }

    /**
     * Get the current user cart from session.
     */
    public function getCart () :Cart
    {
        $cartId = $this->session->get('cart_id');

        if (!$cartId) {
            $cart = new Cart();
            $this->em->persist($cart);
            $this->em->flush();
        }
        else {
            $cart = $this->cartRepository->find($cartId);
        }

        return $cart;
    }

    public function setCartID (Cart $cart): void
    {
        $this->session->set('cart_id', $cart->getId());
    }

}