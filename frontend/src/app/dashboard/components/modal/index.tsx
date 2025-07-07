import { X } from 'lucide-react'
import styles from './styles.module.scss'

export function Modalorder() {
    return (
        <dialog className={styles.dialogContainer}>
            <section className={styles.dialogContent}>
                <button className={styles.dialogBack}>
                    <X size={40} color='#FF3f4b' />
                </button>

                <article className={styles.container}>
                    <h2>Detalhes do pedido</h2>

                    <span className={styles.table}>
                        Mesa <b>30</b>
                    </span>

                    <section className={styles.item}>
                        <span>1 - <b> Coca Cola lata</b></span>
                        <span className={styles.description}>Coca Cola em Lata, 350ml</span>
                    </section>

                    <button className={styles.buttonOrder}>
                        Concluir pedido
                    </button>
                </article>
            </section>
        </dialog>
    )
}